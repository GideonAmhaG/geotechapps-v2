import createError from 'http-errors';

export const calculateFoundation = async (req, res, next) => {
  const { foundationType } = req.body;
  
  // Hardcoded to only allow isolated footing
  if (foundationType !== 'isolated') {
    return next(createError(
      400, 
      'Only isolated footing is currently supported. Contact support for other types.'
    ));
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

  try {
    const response = await fetch('http://localhost:8000/calculate/isolated', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body.inputs),
      signal: controller.signal
    });

    if (!response.ok) {
      const error = await response.json();
      throw createError(response.status, error.detail || 'Calculation service error');
    }

    const { data } = await response.json();
    res.json(data);
  } catch (error) {
    next(createError(
      500,
      error.name === 'AbortError' ? 'Calculation timed out' : error.message
    ));
  } finally {
    clearTimeout(timeout);
  }
};
