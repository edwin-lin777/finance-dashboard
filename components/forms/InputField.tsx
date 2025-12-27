 import React from 'react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
 const InputField = ({ css, name, label, placeholder, type="text", register, error, validation, disabled, value}: FormInputProps) => {
   return (
     <div className="space-y-2">
        <label
        htmlFor={name}
        className="form-label"
        >
            {label}

        </label>
        <Input 
           
            type={type}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            className={cn('form-input ', css,  {'opacity-50 cursor-not-allowed' : disabled})}
            {...register(name,validation)}
        /> 
    {error && <p className="text-red-400 text-sm"> {error.message}</p>}
     </div>

   )
 } 
 
 export default InputField