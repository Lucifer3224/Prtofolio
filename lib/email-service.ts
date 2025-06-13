import emailjs from '@emailjs/browser';

// EmailJS configuration
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

export type EmailFormData = {
  from_name: string;
  reply_to: string;
  subject: string;
  message: string;
};

export const sendEmail = async (form: HTMLFormElement): Promise<boolean> => {
  try {
    // Log the form data being sent (for debugging)
    const formData = new FormData(form);
    const formDataObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value.toString();
    });
    console.log('Sending form data:', formDataObject);
    
    // Check if we have valid EmailJS credentials
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || 
        SERVICE_ID === 'your_service_id' || 
        TEMPLATE_ID === 'your_template_id' || 
        PUBLIC_KEY === 'your_public_key') {
      
      // For demo/development: Log the message and simulate success
      console.log('DEMO MODE: Email would be sent with data:', formDataObject);
      
      // Simulate network delay for realistic testing
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Return success for demo purposes
      return true;
    }
    
    // If we have credentials, actually send the email
    const result = await emailjs.sendForm(
      SERVICE_ID,
      TEMPLATE_ID,
      form,
      PUBLIC_KEY
    );
    
    console.log('Email sent successfully!', result.text);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

/**
 * Set up EmailJS with your public key
 * Call this function once in your app's entry point
 */
export const initEmailService = () => {
  try {
    if (PUBLIC_KEY && PUBLIC_KEY !== 'your_public_key') {
      emailjs.init(PUBLIC_KEY);
      console.log('EmailJS initialized successfully');
    } else {
      console.log('EmailJS demo mode active (no valid PUBLIC_KEY found)');
    }
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
  }
};
