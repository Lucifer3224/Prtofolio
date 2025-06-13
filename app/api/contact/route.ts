import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Get form data from request
    const formData = await req.json();
    
    // Log the received data (for demo/development)
    console.log('Contact form submission:', formData);
    
    // Here you would normally send an email using a service
    // For now, we'll simulate success
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Message received! I\'ll get back to you soon.' 
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again or contact me directly via email.' 
      },
      { status: 500 }
    );
  }
}
