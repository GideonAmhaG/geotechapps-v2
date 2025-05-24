// Helper function to generate consistent field definitions
const createField = (id, label, shortLabel, type, placeholder, unit, description, range, options) => ({
  id,
  label,
  shortLabel,
  type,
  placeholder,
  unit,
  tooltip: `${label} - ${description} - Valid values: ${range}`,
  required: true,
  ...(type === 'number' ? { min: range.split('-')[0].trim(), max: range.split('-')[1].split(' ')[0].trim() } : {}),
  ...(options ? { options } : {}),
});

// Common field configurations
const LOAD_FIELDS = {
  unfactored: [
    createField(
      'DL',
      'Permanent Load (Gk)',
      'Gk',
      'number',
      'e.g. 500',
      'kN',
      'Unfactored permanent vertical load',
      '200-4100 kN'
    ),
    createField(
      'LL',
      'Variable Load (Qk)',
      'Qk',
      'number',
      'e.g. 300',
      'kN',
      'Unfactored variable vertical load',
      '130-2100 kN'
    ),
    createField(
      'mxp',
      'Moment X Permanent',
      'Mx,Gk',
      'number',
      'e.g. 50',
      'kN-m',
      'Unfactored permanent moment about X-axis',
      '-1000-1000 kNm'
    ),
    createField(
      'mxv',
      'Moment X Variable',
      'Mx,Qk',
      'number',
      'e.g. 30',
      'kN-m',
      'Unfactored variable moment about X-axis',
      '-1000-1000 kNm'
    ),
    createField(
      'myp',
      'Moment Y Permanent',
      'My,Gk',
      'number',
      'e.g. 50',
      'kN-m',
      'Unfactored permanent moment about Y-axis',
      '-1000-1000 kNm'
    ),
    createField(
      'myv',
      'Moment Y Variable',
      'My,Qk',
      'number',
      'e.g. 30',
      'kN-m',
      'Unfactored variable moment about Y-axis',
      '-1000-1000 kNm'
    )
  ],
  factored: [
    createField(
      'NED',
      'Design Axial Load',
      'P',
      'number',
      'e.g. 1200',
      'kN',
      'Factored design axial load',
      '300-6000 kN'
    ),
    createField(
      'MXED',
      'Design Moment X',
      'Mx',
      'number',
      'e.g. 150',
      'kN-m',
      'Factored design moment about X-axis',
      '-1500-1500 kNm'
    ),
    createField(
      'MYED',
      'Design Moment Y',
      'My',
      'number',
      'e.g. 150',
      'kN-m',
      'Factored design moment about Y-axis',
      '-1500-1500 kNm'
    )
  ]
};

const MATERIAL_FIELDS = [
  createField(
    'FCK',
    'Concrete Strength',
    'fck',
    'number',
    'e.g. 25',
    'MPa',
    'Characteristic compressive strength',
    '25-100 MPa',
    { step: 5 }
  ),
  createField(
    'FYK',
    'Steel Strength',
    'fyk',
    'number',
    'e.g. 500',
    'MPa',
    'Characteristic yield strength',
    '100-1000 MPa',
    { step: 50 }
  ),
  createField(
    'BAR',
    'Rebar Diameter',
    'Ø',
    'number',
    'e.g. 16',
    'mm',
    'Main reinforcement bar size',
    '12-32 mm',
    { step: 2 }
  ),
  {
    ...createField(
      'COV',
      'Concrete Cover',
      'c',
      'select',
      '',
      '',
      'Nominal concrete cover to reinforcement',
      ''
    ),
    options: [
      { value: "40", label: "40 mm (Footing on lean concrete)" },
      { value: "75", label: "75 mm (Footing on soil)" }
    ],
    tooltip: "Concrete Cover - Nominal concrete cover to reinforcement"
  }
];

// Geometry fields by foundation type
const GEOMETRY_FIELDS = {
  isolated: [
    createField(
      'COL',
      'Column Width X',
      'b',
      'number',
      'e.g. 300',
      'mm',
      'Column dimension along X-axis',
      '100-1500 mm'
    ),
    createField(
      'COLY',
      'Column Width Y',
      'h',
      'number',
      'e.g. 300',
      'mm',
      'Column dimension along Y-axis',
      '100-1500 mm'
    )
  ],
  combined: [
    createField(
      'COL1',
      'Column 1 Width X',
      'b1',
      'number',
      'e.g. 300',
      'mm',
      'First column X dimension',
      '100-1500 mm'
    ),
    createField(
      'COLY1',
      'Column 1 Width Y',
      'h1',
      'number',
      'e.g. 300',
      'mm',
      'First column Y dimension',
      '100-1500 mm'
    ),
    createField(
      'COL2',
      'Column 2 Width X',
      'b2',
      'number',
      'e.g. 300',
      'mm',
      'Second column X dimension',
      '100-1500 mm'
    ),
    createField(
      'COLY2',
      'Column 2 Width Y',
      'h2',
      'number',
      'e.g. 300',
      'mm',
      'Second column Y dimension',
      '100-1500 mm'
    ),
    createField(
      'COL_SPACING',
      'Column Spacing',
      'L',
      'number',
      'e.g. 3000',
      'mm',
      'Distance between column centers',
      '500-10000 mm'
    )
  ],
  strap: [
    createField(
      'COL_MAIN',
      'Main Column Width',
      'bc',
      'number',
      'e.g. 400',
      'mm',
      'Primary column dimension',
      '100-1500 mm'
    ),
    createField(
      'COL_STRAP',
      'Strap Column Width',
      'bs',
      'number',
      'e.g. 300',
      'mm',
      'Secondary column dimension',
      '100-1500 mm'
    ),
    createField(
      'STRAP_LENGTH',
      'Strap Beam Length',
      'Ls',
      'number',
      'e.g. 2500',
      'mm',
      'Distance between columns',
      '500-10000 mm'
    )
  ],
  retaining: [
    createField(
      'WALL_HEIGHT',
      'Wall Height',
      'H',
      'number',
      'e.g. 2000',
      'mm',
      'Total wall height',
      '500-10000 mm'
    ),
    createField(
      'WALL_THICKNESS',
      'Wall Thickness',
      't',
      'number',
      'e.g. 300',
      'mm',
      'Base thickness of wall',
      '100-1500 mm'
    ),
    createField(
      'TOE_LENGTH',
      'Toe Length',
      'Lt',
      'number',
      'e.g. 1000',
      'mm',
      'Length of toe extension',
      '300-5000 mm'
    ),
    createField(
      'HEEL_LENGTH',
      'Heel Length',
      'Lh',
      'number',
      'e.g. 1500',
      'mm',
      'Length of heel extension',
      '300-5000 mm'
    )
  ]
};

// Soil fields by soil type
const SOIL_FIELDS = {
  CU: [
    createField(
      'DF',
      'Foundation Depth',
      'Df',
      'number',
      'e.g. 1500',
      'mm',
      'Depth from ground surface to footing base',
      '100-10000 mm'
    ),
    createField(
      'CU',
      'Undrained Cohesion',
      'Cu',
      'number',
      'e.g. 50',
      'kPa',
      'Soil undrained cohesion/shear strength',
      '1-1000 kPa'
    ),
    createField(
      'GAM',
      'Soil Unit Weight',
      'γ',
      'number',
      'e.g. 18',
      'kN/m³',
      'Unit weight of soil',
      '1.1-30 kN/m³',
      { step: 0.1 }
    )
  ],
  CD: [
    createField(
      'DF',
      'Foundation Depth',
      'Df',
      'number',
      'e.g. 1500',
      'mm',
      'Depth from ground surface to footing base',
      '100-10000 mm'
    ),
    createField(
      'C_PRIME',
      'Effective Cohesion',
      "c'",
      'number',
      'e.g. 5',
      'kPa',
      'Effective cohesion parameter',
      '0-200 kPa'
    ),
    createField(
      'PHI_PRIME',
      'Friction Angle',
      "φ'",
      'number',
      'e.g. 25',
      '°',
      'Effective angle of internal friction',
      '1-70°'
    ),
    createField(
      'GAM',
      'Soil Unit Weight',
      'γ',
      'number',
      'e.g. 18',
      'kN/m³',
      'Unit weight of soil',
      '1.1-30 kN/m³',
      { step: 0.1 }
    )
  ],
  S: [
    createField(
      'DF',
      'Foundation Depth',
      'Df',
      'number',
      'e.g. 1500',
      'mm',
      'Depth from ground surface to footing base',
      '100-10000 mm'
    ),
    createField(
      'PHI_PRIME',
      'Friction Angle',
      "φ'",
      'number',
      'e.g. 30',
      '°',
      'Effective angle of internal friction',
      '1-70°'
    ),
    createField(
      'GAM',
      'Soil Unit Weight',
      'γ',
      'number',
      'e.g. 18',
      'kN/m³',
      'Unit weight of soil',
      '1.1-30 kN/m³',
      { step: 0.1 }
    )
  ],
  CUST: [
    createField(
      'BC',
      'Bearing Capacity',
      'qa',
      'number',
      'e.g. 200',
      'kPa',
      'Allowable bearing capacity',
      '50-1000 kPa'
    )
  ]
};

export {
  LOAD_FIELDS as COMMON_FIELDS,
  MATERIAL_FIELDS,
  GEOMETRY_FIELDS,
  SOIL_FIELDS
};