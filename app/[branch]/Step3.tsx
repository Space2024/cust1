"use client";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { setEditField } from './store/formSlice';
import { Pencil, Save, AlertCircle } from 'lucide-react';
import { ValidationState } from './types';

interface FieldProps {
  label: string;
  value: string | number | undefined;
  field: string;
  type?: string;
  onValidationChange?: (isValid: boolean) => void;
}

interface Step3Props {
  onMobileValidationChange: (validation: ValidationState) => void;
}

const Step3: React.FC<Step3Props> = ({ onMobileValidationChange }) => {
  const formData = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const [mobileValidation, setMobileValidation] = useState<ValidationState>({
    isValid: true,
    message: '',
    status: null
  });

  useEffect(() => {
    onMobileValidationChange(mobileValidation);
  }, [mobileValidation, onMobileValidationChange]);

  // Expose validation state to parent component
  useEffect(() => {
    if (window && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('mobileValidationChange', {
        detail: {
          isValid: mobileValidation.isValid,
          status: mobileValidation.status
        }
      }));
    }
  }, [mobileValidation]);

  const Field: React.FC<FieldProps> = ({ label, value, field, type }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [fieldValue, setFieldValue] = useState(value);
    const [isChecking, setIsChecking] = useState(false);

    const handleEditClick = () => {
      setIsEditing(true);
      if (field === 'mobileNo') {
        setMobileValidation({ isValid: true, message: '', status: null });
      }
    };

    const validateMobileNumber = async (mobileNo: string) => {
      if (!/^\d{10}$/.test(mobileNo)) {
        setMobileValidation({
          isValid: false,
          message: 'Mobile number must be exactly 10 digits',
          status: null
        });
        return false;
      }

      setIsChecking(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CHIT_API || 'https://cust.spacetextiles.net'}/check_users/${mobileNo}`);
        const data = await response.json();

        if (data.exists) {
          const status = data.status as 'P' | 'V';
          const message = status === 'V' 
            ? 'This mobile number is already registered and verified.'
            : 'This mobile number is pending verification.';
          
          setMobileValidation({
            isValid: status === 'P',
            message,
            status
          });
          return status === 'P';
        } else {
          setMobileValidation({
            isValid: true,
            message: '',
            status: null
          });
          return true;
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setMobileValidation({
          isValid: false,
          message: 'Error checking mobile number. Please try again.',
          status: null
        });
        return false;
      } finally {
        setIsChecking(false);
      }
    };

    const handleSaveClick = async () => {
      if (field === 'mobileNo') {
        const isValid = await validateMobileNumber(fieldValue as string);
        if (!isValid) return;
      }

      dispatch(setEditField({ field, value: fieldValue }));
      setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (field === 'mobileNo') {
        const sanitizedValue = newValue.replace(/\D/g, '').slice(0, 10);
        setFieldValue(sanitizedValue);
        if (sanitizedValue.length === 10) {
          validateMobileNumber(sanitizedValue);
        } else {
          setMobileValidation({
            isValid: false,
            message: 'Mobile number must be exactly 10 digits',
            status: null
          });
        }
      } else {
        setFieldValue(newValue);
      }
    };

    return (
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between">
          <div className="flex-grow">
            <span className="font-bold text-sm lg:text-base">{label}:</span>
            {isEditing ? (
              <div className="relative w-full">
                <input
                  type={type || "text"}
                  value={fieldValue}
                  onChange={handleInputChange}
                  className={`border rounded p-1 ml-2 text-sm lg:text-base w-full ${
                    field === 'mobileNo' && !mobileValidation.isValid 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  }`}
                  inputMode={field === 'mobileNo' ? 'numeric' : 'text'}
                  disabled={isChecking}
                />
                {isChecking && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>
            ) : (
              <span className="text-sm lg:text-base ml-2">{value || 'Not provided'}</span>
            )}
          </div>
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className={`text-green-500 hover:text-green-700 text-sm ml-3 mt-6 ${
                isChecking ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isChecking || (field === 'mobileNo' && !mobileValidation.isValid)}
            >
              <Save size={24} />
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="text-blue-500 hover:text-blue-700 ml-2"
            >
              <Pencil size={16} />
            </button>
          )}
        </div>
        {field === 'mobileNo' && mobileValidation.message && (
          <div className={`flex items-center mt-1 text-sm ${
            mobileValidation.isValid ? 'text-yellow-600' : 'text-red-500'
          }`}>
            <AlertCircle size={16} className="mr-1" />
            <p>{mobileValidation.message}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-md w-full p-6 mx-auto">
      <p className="text-lg text-center font-bold mb-6 text-blue-800">
        Please Review Your Information Before Submitting.
      </p>
      <div className="space-y-3">
        <Field label="Customer Name" value={formData.customerName} field="customerName" />
        <Field 
          label="Mobile No" 
          value={formData.mobileNo} 
          field="mobileNo" 
          type="tel"
        />
        <Field label="Email" value={formData.email} field="email" type="email" />
        <Field label="Address" value={formData.doorNo} field="doorNo" />
        <Field label="Street" value={formData.street} field="street" />
        <Field label="Area" value={formData.area} field="area" />
        <Field label="Taluk" value={formData.taluk} field="taluk" />
        <Field label="City" value={formData.city} field="city" />
        <Field label="State" value={formData.state} field="state" />
      </div>
    </div>
  );
};

export default Step3;