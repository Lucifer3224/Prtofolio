'use client';

import { useEffect } from 'react';
import { initEmailService } from '@/lib/email-service';

export default function EmailServiceInitializer() {
  useEffect(() => {
    // Initialize EmailJS when component mounts
    initEmailService();
  }, []);

  return null; // This component doesn't render anything
}
