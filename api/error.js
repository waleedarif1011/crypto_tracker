// Vercel serverless function for error reporting
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { error, stack, context, timestamp, url, userAgent } = req.body;

    // Log error to console (in production, this would go to a logging service)
    console.error('Client Error Report:', {
      error,
      stack,
      context,
      timestamp,
      url,
      userAgent,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    });

    // In a real application, you would:
    // 1. Send to error tracking service (Sentry, LogRocket, etc.)
    // 2. Store in database
    // 3. Send notifications to team

    // For now, just acknowledge receipt
    res.status(200).json({ 
      success: true, 
      message: 'Error reported successfully' 
    });

  } catch (error) {
    console.error('Error in error reporting handler:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process error report' 
    });
  }
}
