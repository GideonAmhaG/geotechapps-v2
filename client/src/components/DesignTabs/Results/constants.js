export const MAIN_RESULTS = [
  { id: 'b', label: 'Width (B)', unit: 'mm' },
  { id: 'l', label: 'Length (L)', unit: 'mm' },
  { id: 'd', label: 'Thickness (D)', unit: 'mm' },
  { id: 'Nxb', label: 'Number of bars, x-direction, bottom (Nxb)', unit: '' },
  { id: 'Nyb', label: 'Number of bars, y-direction, bottom (Nyb)', unit: '' }, 
  { id: 'Sxb', label: 'Spacing between bars, x-direction, bottom (Sxb)', unit: 'mm' },
  { id: 'Syb', label: 'Spacing between bars, y-direction, bottom (Syb)', unit: 'mm' },
];

export const ADDITIONAL_RESULTS = [
  { id: 'As', label: 'Reinforcement Area (As)', unit: 'mm²' },
  { id: 'qu', label: 'Ultimate Bearing Capacity (qu)', unit: 'kPa' },
  { id: 'qa', label: 'Allowable Bearing Capacity (qa)', unit: 'kPa' },
  { id: 'fs', label: 'Factor of Safety (FS)', unit: '' },
  { id: 'sig_p', label: 'Maximum Stress (σmax)', unit: 'kPa' },
  { id: 'vrd', label: 'Shear Resistance (vRd)', unit: 'kPa' },
  { id: 'mrd', label: 'Moment Resistance (MRd)', unit: 'kNm' }
];

export const VERIFICATION_CHECKS = [
  { id: 'ved_wide', label: 'Wide Beam Shear (vEd)', unit: 'kPa' },
  { id: 'vrd_wide', label: 'Wide Beam Resistance (vRd)', unit: 'kPa' },
  { id: 'ved_punch', label: 'Punching Shear (vEd)', unit: 'kPa' },
  { id: 'vrd_punch', label: 'Punching Resistance (vRd)', unit: 'kPa' },
  { id: 'med', label: 'Design Moment (MEd)', unit: 'kNm' },
  { id: 'mrd', label: 'Moment Resistance (MRd)', unit: 'kNm' }
];