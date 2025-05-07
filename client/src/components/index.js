import { lazy } from 'react';

export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";
export { default as FeatureCard } from "./FeatureCard";
export { default as WhyChooseCard } from "./WhyChooseCard";
export { default as AdvantageCard } from "./AdvantageCard";
export { default as ComplianceItem } from "./ComplianceItem";
export const PricingTabs = lazy(() => import("./PricingTabs"));

export { default as FoundationType } from './DesignTabs/FoundationType';
export { default as InputParameters } from './DesignTabs/InputParameters/index.jsx';
export { default as Results } from './DesignTabs/Results';
export { default as SoilType } from './DesignTabs/SoilType';
export { default as SelectionSummary } from './DesignTabs/SelectionSummary';

export { default as ParameterInput } from './shared/ParameterInput';
export { default as ResultCard } from './shared/ResultCard';
export { default as TabButton } from './shared/TabButton';
export { default as GuidanceSection } from './shared/GuidanceSection';
export { default as SelectionBox } from './shared/SelectionBox';