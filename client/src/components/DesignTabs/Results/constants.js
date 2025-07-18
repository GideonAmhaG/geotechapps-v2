// Field formatting constants
export const FIELD_FORMATTING = {
  decimals: 2,
  smallNumberThreshold: 0.0001,
  smallNumberDecimals: 4
};

// Main results table configuration
export const MAIN_RESULTS = [
  { id: 'b', label: 'Width (B)', unit: 'mm' },
  { id: 'l', label: 'Length (L)', unit: 'mm' },
  { id: 'd', label: 'Thickness (D)', unit: 'mm' },
  { id: 'Nxb', label: 'Number of bars, x-direction, bottom (Nxb)', unit: '' },
  { id: 'Nyb', label: 'Number of bars, y-direction, bottom (Nyb)', unit: '' },
  { id: 'Sxb', label: 'Spacing between bars, x-direction, bottom (Sxb)', unit: 'mm' },
  { id: 'Syb', label: 'Spacing between bars, y-direction, bottom (Syb)', unit: 'mm' },
];

// Additional results table configuration
export const ADDITIONAL_RESULTS = [
  { id: 'As', label: 'Reinforcement Area (As)', unit: 'mm²' },
  { id: 'qu', label: 'Ultimate Bearing Capacity (qu)', unit: 'kPa' },
  { id: 'qa', label: 'Allowable Bearing Capacity (qa)', unit: 'kPa' },
  { id: 'fs', label: 'Factor of Safety (FS)', unit: '' },
  { id: 'sig_p', label: 'Maximum Stress (σmax)', unit: 'kPa' },
  { id: 'vrd', label: 'Shear Resistance (vRd)', unit: 'kPa' },
  { id: 'mrd', label: 'Moment Resistance (MRd)', unit: 'kNm' }
];

// Verification checks table configuration
export const VERIFICATION_CHECKS = [
  { id: 'ved_wide', label: 'Wide Beam Shear (vEd)', unit: 'kPa' },
  { id: 'vrd_wide', label: 'Wide Beam Resistance (vRd)', unit: 'kPa' },
  { id: 'ved_punch', label: 'Punching Shear (vEd)', unit: 'kPa' },
  { id: 'vrd_punch', label: 'Punching Resistance (vRd)', unit: 'kPa' },
  { id: 'med', label: 'Design Moment (MEd)', unit: 'kNm' },
  { id: 'mrd', label: 'Moment Resistance (MRd)', unit: 'kNm' }
];

// Geotechnical design table configuration
export const GEOTECHNICAL_ITEMS = [
  { id: 'D_final', label: 'Footing thickness (D)', unit: 'mm' },
  { id: 'gamma_conc', label: 'Concrete Unit Weight (γconc)', unit: 'kN/m³', symbol: 'γ' },
  { id: 'SW_conc', label: 'Self weight of footing (SWconc)', unit: 'kN' },
  { id: 'SW_fill', label: 'Self weight of fill (SWfill)', unit: 'kN' },
  { id: 'DL', label: 'Permanent Load (Gk)', unit: 'kN' },
  { id: 'LL', label: 'Variable Load (Qk)', unit: 'kN' },
  { id: 'p_p', label: 'Service Load (P = [Gk + SWconc + SWfill] + Qk)', unit: 'kN' },
  { id: 'B_final', label: 'Footing Width (B)', unit: 'mm' },
  { id: 'L_final', label: 'Footing Length (L)', unit: 'mm' },
  { id: 'area', label: 'Footing Area (A)', unit: 'm²' },
  { id: 'mxp', label: 'Moment X (Mx = Mx,Gk + Mx,Qk)', unit: 'kNm' },
  { id: 'myp', label: 'Moment Y (My = My,Gk + My,Qk)', unit: 'kNm' },
  { id: 'ex', label: 'Eccentricity X (ex)', unit: 'mm', decimals: 4 },
  { id: 'ey', label: 'Eccentricity Y (ey)', unit: 'mm', decimals: 4 },
  { id: 'CU', label: 'Undrained Cohesion (Cu)', unit: 'kPa' },
  { id: 'gamma', label: 'Soil Unit Weight (γ)', unit: 'kN/m³', symbol: 'γ' },
  { id: 'Df', label: 'Foundation Depth (Df)', unit: 'mm' },
  { id: 'qu', label: 'Ultimate Bearing Capacity (qu)', unit: 'kPa' },
  { id: 'fs', label: 'Factor of Safety (FS)', unit: '' },
  { id: 'sig_p', label: 'Maximum Stress (σmax)', unit: 'kPa', symbol: 'σ' },
  { id: 'qa', label: 'Allowable Bearing Capacity (qall)', unit: 'kPa' }
];

// Structural design table configuration
export const STRUCTURAL_ITEMS = [
  { id: 'p_s', label: 'Design Load (P = 1.35Gk + 1.5Qk)', unit: 'kN' },
  { id: 'sig_s', label: 'Design Stress (σ)', unit: 'kPa', symbol: 'σ' },
  { id: 'fck', label: 'Concrete Strength (fck)', unit: 'MPa' },
  { id: 'fyk', label: 'Steel Strength (fyk)', unit: 'MPa' }
];

// Shear failure (punching) table configuration
export const SHEAR_PUNCHING_ITEMS = [
  { id: 'd_punch', label: 'Effective Depth (d)', unit: 'mm' },
  { id: 'k_punch', label: 'Size Factor (k)', unit: '' },
  { id: 'rho_final', label: 'Reinforcement Ratio (ρ)', unit: '', decimals: 4, symbol: 'ρ' },
  { id: 'As_punch', label: 'Critical-Section Surface Area (Acs)', unit: 'm²' },
  { id: 'Ap2_punch', label: 'Critical-Section Cross-Sectional Area (Acc)', unit: 'm²' },
  { id: 'vrd_min_punch', label: 'Minimum Shear Resistance (vRd,min)', unit: 'kPa' },
  { id: 'ved_punch', label: 'Design Shear Stress (vEd)', unit: 'kPa' },
  { id: 'vrd_punch', label: 'Shear Resistance (vRd)', unit: 'kPa' },
  { id: 'D_punch', label: 'Required Depth (D)', unit: 'mm' }
];

// Shear failure (wide beam) table configuration
export const SHEAR_WIDE_BEAM_ITEMS = [
  { id: 'd_wide', label: 'Effective Depth (d)', unit: 'mm' },
  { id: 'k_wide', label: 'Size Factor (k)', unit: '' },
  { id: 'rho_final', label: 'Reinforcement Ratio (ρ)', unit: '', decimals: 4, symbol: 'ρ' },
  { id: 'As_wide', label: 'Critical-Section Surface Area (Acs)', unit: 'm²' },
  { id: 'Ap2_wide', label: 'Critical-Section Cross-Sectional Area (Acc)', unit: 'm²' },
  { id: 'vrd_min_wide', label: 'Minimum Shear Resistance (vRd,min)', unit: 'kPa' },
  { id: 'ved_wide', label: 'Design Shear Stress (vEd)', unit: 'kPa' },
  { id: 'vrd_wide', label: 'Shear Resistance (vRd)', unit: 'kPa' },
  { id: 'D_wide', label: 'Required Depth (D)', unit: 'mm' }
];

// Bending moment failure table configuration
export const BENDING_MOMENT_ITEMS = [
  { id: 'd_final', label: 'Effective Depth (d)', unit: 'mm' },
  { id: 'B_final', label: 'Footing Width (B)', unit: 'mm' },
  { id: 'z', label: 'Lever Arm (z)', unit: 'mm' },
  { id: 'rho_min', label: 'Minimum Reinforcement Ratio (ρmin)', unit: '', decimals: 4, symbol: 'ρ' },
  { id: 'rho_final', label: 'Reinforcement Ratio (ρ)', unit: '', decimals: 4, symbol: 'ρ' },
  { id: 'Asmin', label: 'Minimum Reinforcement Area (As,min)', unit: 'mm²' },
  { id: 'med', label: 'Design Moment (MEd)', unit: 'kNm' },
  { id: 'mrd', label: 'Moment Resistance (MRd)', unit: 'kNm' },
  { id: 'As_old', label: 'Required Reinforcement Area (As)', unit: 'mm²' }
];

// Final rounded values table configuration
export const FINAL_VALUES_ITEMS = [
  { id: 'b', label: 'Footing Width (B)', unit: 'mm' },
  { id: 'l', label: 'Footing Length (L)', unit: 'mm' },
  { id: 'd', label: 'Footing Thickness (D)', unit: 'mm' },
  { id: 'Nxb', label: 'Number of bars, x-direction, bottom (Nxb)', unit: '' },
  { id: 'Nyb', label: 'Number of bars, y-direction, bottom (Nyb)', unit: '' },
  { id: 'Sxb', label: 'Spacing between bars, x-direction, bottom (Sxb)', unit: 'mm' },
  { id: 'Syb', label: 'Spacing between bars, y-direction, bottom (Syb)', unit: 'mm' }
];

// Project information items
export const PROJECT_INFO_ITEMS = [
  { id: 'foundationType', label: 'Foundation Type' },
  { id: 'soilType', label: 'Soil Type' },
  { id: 'loadType', label: 'Load Type' }
];

// Input parameters items
export const INPUT_PARAMETERS_ITEMS = [
  { id: 'DL', label: 'Permanent Load (Gk)', unit: 'kN' },
  { id: 'LL', label: 'Variable Load (Qk)', unit: 'kN' },
  { id: 'mxp', label: 'Moment X Permanent (Mx,Gk)', unit: 'kNm' },
  { id: 'mxv', label: 'Moment X Variable (Mx,Qk)', unit: 'kNm' },
  { id: 'myp', label: 'Moment Y Permanent (My,Gk)', unit: 'kNm' },
  { id: 'myv', label: 'Moment Y Variable (My,Qk)', unit: 'kNm' },
  { id: 'colx', label: 'Column Width X (b)', unit: 'mm' },
  { id: 'coly', label: 'Column Width Y (h)', unit: 'mm' },
  { id: 'Df', label: 'Foundation Depth (Df)', unit: 'mm' },
  { id: 'CU', label: 'Undrained Cohesion (Cu)', unit: 'kPa' },
  { id: 'gamma', label: 'Soil Unit Weight (γ)', unit: 'kN/m³', symbol: 'γ' },
  { id: 'fck', label: 'Concrete Strength (fck)', unit: 'MPa' },
  { id: 'fyk', label: 'Steel Strength (fyk)', unit: 'MPa' },
  { id: 'bar', label: 'Rebar Diameter (Ø)', unit: 'mm' },
  { id: 'covr', label: 'Concrete Cover (c)', unit: 'mm' }
];

// Type mappings
export const TYPE_MAPPINGS = {
  foundation: {
    isolated: 'Isolated Footing',
    combined: 'Combined Footing',
    strap: 'Strap Footing',
    retaining: 'Retaining Wall'
  },
  soil: {
    CU: 'Clay (Undrained)',
    CD: 'Clay (Drained)',
    S: 'Sand',
    CUST: 'Custom Bearing Capacity'
  },
  load: {
    unfactored: 'Unfactored Loads',
    factored: 'Factored Loads'
  }
};