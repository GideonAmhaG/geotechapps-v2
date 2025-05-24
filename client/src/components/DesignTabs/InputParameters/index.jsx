import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { styles } from "../../../styles";
import FormField from "./FormField";
import {
  COMMON_FIELDS,
  MATERIAL_FIELDS,
  GEOMETRY_FIELDS,
  SOIL_FIELDS,
} from "./constants";

const InputParameters = ({ data, updateData, setActiveTab }) => {
  const { foundationType, soilType, loadType } = data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data.inputs || {},
  });

  const SectionSeparator = ({ title }) => (
    <div className="w-full my-6">
      <h3 className={`${styles.cardTitle} !text-[#008080] mb-2`}>{title}</h3>
      <div className="w-full border-t border-gray-200" />
    </div>
  );

  const getGeometryFields = useCallback(() => {
    return GEOMETRY_FIELDS[foundationType] || [];
  }, [foundationType]);

  const getSoilFields = useCallback(() => {
    return SOIL_FIELDS[soilType] || [];
  }, [soilType]);

  const onSubmit = (formData) => {
    updateData("inputs", formData);
    setActiveTab(4);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={`${styles.sectionTitleText}`}>Inputs</h2>
      <p className={`${styles.sectionBodyText} mb-6`}>
        Enter the required parameters for your foundation design
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SectionSeparator title="Loads and Moments" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMMON_FIELDS[loadType].map((field) => (
            <FormField
              key={field.id}
              field={{
                ...field,
                displayLabel: field.shortLabel || field.id,
              }}
              register={register}
              errors={errors}
            />
          ))}
        </div>

        <SectionSeparator title="Geometry" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getGeometryFields().map((field) => (
            <FormField
              key={field.id}
              field={{
                ...field,
                displayLabel: field.shortLabel || field.id,
              }}
              register={register}
              errors={errors}
            />
          ))}
        </div>

        <SectionSeparator title="Soil Properties" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getSoilFields().map((field) => (
            <FormField
              key={field.id}
              field={{
                ...field,
                displayLabel: field.shortLabel || field.id,
              }}
              register={register}
              errors={errors}
            />
          ))}
        </div>

        <SectionSeparator title="Material Properties" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MATERIAL_FIELDS.map((field) => (
            <FormField
              key={field.id}
              field={{
                ...field,
                displayLabel: field.shortLabel || field.id,
              }}
              register={register}
              errors={errors}
            />
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className={`${styles.cardTitle} px-6 py-2 bg-[#145da0] text-white rounded-md hover:bg-[#0e4a7c] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 shadow-sm`}
          >
            Calculate Design
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputParameters;
