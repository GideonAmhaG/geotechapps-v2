export const calculateFoundation = async (req, res, next) => {
  const { foundationType, inputs } = req.body;
  
  if (foundationType !== 'isolated') {
    return next(createError(400, 'Only isolated footing is currently supported'));
  }

  try {
    const response = await fetch('http://localhost:8000/calculate/isolated', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs),
      timeout: 8000
    });

    if (!response.ok) {
      const error = await response.json();
      throw createError(response.status, error.detail || 'Calculation service error');
    }

    const { data } = await response.json();
    res.json({ data }); 
  } catch (error) {
    next(createError(500, error.message));
  }
};
