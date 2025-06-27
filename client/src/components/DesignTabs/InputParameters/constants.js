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
  ...(type === 'number' ? { 
    min: range.split('-')[0].trim(), 
    max: range.split('-')[1].split(' ')[0].trim(),
    ...(options?.step && { step: options.step })
  } : {}),
  ...(options?.options ? { options: options.options } : {})
});

// Shared field configurations
const FIELD_TEMPLATES = {
  load: {
    kN: (id, label, shortLabel, range) => 
      createField(id, label, shortLabel, 'number', `e.g. ${range.split('-')[0]}`, 'kN', 
                `Unfactored ${label.toLowerCase()}`, range),
    kNm: (id, label, shortLabel) => 
      createField(id, label, shortLabel, 'number', 'e.g. 50', 'kN-m', 
                `Unfactored ${label.toLowerCase()}`, '-1000-1000 kNm')
  },
  material: {
    strength: (id, label, range, step) => 
      createField(id, label, id, 'number', `e.g. ${range.split('-')[0]}`, 'MPa', 
                `Characteristic ${label.toLowerCase()}`, range, { step }),
    bar: () => 
      createField('bar', 'Rebar Diameter', 'Ø', 'number', 'e.g. 16', 'mm', 
                'Main reinforcement bar size', '12-32 mm', { step: 2 }),
    cover: () => ({
      ...createField('covr', 'Concrete Cover', 'c', 'select', '', '', 
                   'Nominal concrete cover to reinforcement', ''),
      options: [
        { value: "40", label: "40 mm (Footing on lean concrete)" },
        { value: "75", label: "75 mm (Footing on soil)" }
      ]
    })
  },
  geometry: {
    dimension: (id, label, shortLabel) => 
      createField(id, label, shortLabel, 'number', 'e.g. 300', 'mm', 
                `${label} dimension`, '100-1500 mm'),
    spacing: (id, label, shortLabel) => 
      createField(id, label, shortLabel, 'number', 'e.g. 3000', 'mm', 
                `Distance between ${label.toLowerCase()}`, '500-10000 mm')
  },
  soil: {
    depth: () => 
      createField('Df', 'Foundation Depth', 'Df', 'number', 'e.g. 1500', 'mm', 
                'Depth from ground surface to footing base', '100-10000 mm'),
    weight: () => 
      createField('gamma', 'Soil Unit Weight', 'γ', 'number', 'e.g. 18', 'kN/m³', 
                'Unit weight of soil', '1.1-30 kN/m³', { step: 0.1 })
  }
};

// Field definitions
const LOAD_FIELDS = {
  unfactored: [
    FIELD_TEMPLATES.load.kN('DL', 'Permanent Load (Gk)', 'Gk', '200-4100 kN'),
    FIELD_TEMPLATES.load.kN('LL', 'Variable Load (Qk)', 'Qk', '130-2100 kN'),
    FIELD_TEMPLATES.load.kNm('mxp', 'Moment X Permanent', 'Mx,Gk'),
    FIELD_TEMPLATES.load.kNm('mxv', 'Moment X Variable', 'Mx,Qk'),
    FIELD_TEMPLATES.load.kNm('myp', 'Moment Y Permanent', 'My,Gk'),
    FIELD_TEMPLATES.load.kNm('myv', 'Moment Y Variable', 'My,Qk')
  ],
  factored: [
    FIELD_TEMPLATES.load.kN('NED', 'Design Axial Load', 'P', '300-6000 kN'),
    FIELD_TEMPLATES.load.kNm('MXED', 'Design Moment X', 'Mx'),
    FIELD_TEMPLATES.load.kNm('MYED', 'Design Moment Y', 'My')
  ]
};

const MATERIAL_FIELDS = [
  FIELD_TEMPLATES.material.strength('fck', 'Concrete Strength', '25-100 MPa', 5),
  FIELD_TEMPLATES.material.strength('fyk', 'Steel Strength', '100-1000 MPa', 50),
  FIELD_TEMPLATES.material.bar(),
  FIELD_TEMPLATES.material.cover()
];

const GEOMETRY_FIELDS = {
  isolated: [
    FIELD_TEMPLATES.geometry.dimension('colx', 'Column Width X', 'b'),
    FIELD_TEMPLATES.geometry.dimension('coly', 'Column Width Y', 'h')
  ],
  combined: [
    FIELD_TEMPLATES.geometry.dimension('colx1', 'Column 1 Width X', 'b1'),
    FIELD_TEMPLATES.geometry.dimension('coly1', 'Column 1 Width Y', 'h1'),
    FIELD_TEMPLATES.geometry.dimension('colx2', 'Column 2 Width X', 'b2'),
    FIELD_TEMPLATES.geometry.dimension('coly2', 'Column 2 Width Y', 'h2'),
    FIELD_TEMPLATES.geometry.spacing('col_spacing', 'Column Spacing', 'L')
  ],
  strap: [
    FIELD_TEMPLATES.geometry.dimension('col_main', 'Main Column Width', 'bc'),
    FIELD_TEMPLATES.geometry.dimension('col_strap', 'Strap Column Width', 'bs'),
    FIELD_TEMPLATES.geometry.spacing('strap_length', 'Strap Beam Length', 'Ls')
  ],
  retaining: [
    FIELD_TEMPLATES.geometry.dimension('wall_height', 'Wall Height', 'H'),
    FIELD_TEMPLATES.geometry.dimension('wall_thickness', 'Wall Thickness', 't'),
    FIELD_TEMPLATES.geometry.dimension('toe_length', 'Toe Length', 'Lt'),
    FIELD_TEMPLATES.geometry.dimension('heel_length', 'Heel Length', 'Lh')
  ]
};

const SOIL_FIELDS = {
  CU: [
    FIELD_TEMPLATES.soil.depth(),
    createField('CU', 'Undrained Cohesion', 'Cu', 'number', 'e.g. 50', 'kPa', 
              'Soil undrained cohesion/shear strength', '1-1000 kPa'),
    FIELD_TEMPLATES.soil.weight()
  ],
  CD: [
    FIELD_TEMPLATES.soil.depth(),
    createField('c_prime', 'Effective Cohesion', "c'", 'number', 'e.g. 5', 'kPa', 
              'Effective cohesion parameter', '0-200 kPa'),
    createField('phi_prime', 'Friction Angle', "φ'", 'number', 'e.g. 25', '°', 
              'Effective angle of internal friction', '1-70°'),
    FIELD_TEMPLATES.soil.weight()
  ],
  S: [
    FIELD_TEMPLATES.soil.depth(),
    createField('phi_prime', 'Friction Angle', "φ'", 'number', 'e.g. 30', '°', 
              'Effective angle of internal friction', '1-70°'),
    FIELD_TEMPLATES.soil.weight()
  ],
  CUST: [
    createField('bc', 'Bearing Capacity', 'qa', 'number', 'e.g. 200', 'kPa', 
              'Allowable bearing capacity', '50-1000 kPa')
  ]
};

export {
  LOAD_FIELDS as COMMON_FIELDS,
  MATERIAL_FIELDS,
  GEOMETRY_FIELDS,
  SOIL_FIELDS
};
