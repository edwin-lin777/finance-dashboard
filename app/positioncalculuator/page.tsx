"use client"
import React, { useState } from 'react'
import Header from '@/components/Header'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {motion} from "framer-motion";
import InputField from '@/components/forms/InputField'
import VantaBackground from '@/components/vantaBackground'

const page = () => {

  

  const {register, handleSubmit, formState: {isSubmitting, errors}} = useForm<PositionCalculator>();

   const [positionSize, setPositionSize] = useState("");

  const onSubmit = async (data: PositionCalculator) => {
    const amountofShares = Math.abs((data.risk * 0.01 * data.accountSize) / (data.entry - data.stopLoss)).toFixed(2)
    setPositionSize(amountofShares + " Shares");

}


  return (
   
    <motion.div
    initial={{opacity: 0, y: -35}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 2, delay: 0.35}}
        style={{zIndex: 1}}>

  
    <div className="w-full">
      <div className="text-4xl font-bold flex flex-row justify-center pt-7 font-sans">
        Position Size Calculator 
        <br/>
        
       <div className="fixed top-0 left-0 pt-3 pl-5">
        <Link href="/">
        <Button type= "button" className="hover: cursor-pointer">
          Home
        </Button>
        </Link>
      </div>
      
      </div>
     <div className="flex justify-center mt-5">
        <motion.h1 className="text-3xl font-bold font-sans" 
            key={positionSize}
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}> { positionSize === "" ?  positionSize : positionSize}
          </motion.h1>
          </div>
      <div className=" pl-5  flex-col justify-start h-screen w-1/4">
        <h1 className="form-title">
        Enter Position Attributes
        </h1>
        <div>
          <div className="gap-3">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
      <InputField
       label="Amount of Risk"
       css="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
       name="risk"
       error={errors.risk}
       placeholder="Enter % Risk"
       register={register}
       type="number"
       validation={{
        required: "Risk Precentage is required",
        min: {
          value: 0,
          message: "Please enter a positive number",
        },
      valueAsNumber: true,
       }
       }
      />
       <InputField
       label="Total Account Size"
       css="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
       name="accountSize"
       placeholder="Enter account size"
       register={register}
       type="number"
       error={errors.accountSize}
       validation={{
        required: "Account Size is Required",
        min: {
          value: 0,
          message: "Please enter a positive account size",
        },
      valueAsNumber: true,
       }
       }
      />
       <InputField
       label="Price Entry"
       css="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
       name="entry"
       placeholder="Enter entry"
       register={register}
       type="number"
       error = {errors.entry}
       validation={{
        required: "Entry is Required",
        min: {
          value: 0,
          message: "Please enter a positive number",
        },
      valueAsNumber: true,
       }
       }
      />
        <InputField
       label="Stop-Loss"
       css="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
       name="stopLoss"
       placeholder="Enter stoploss"
       register={register}
       error={errors.stopLoss}
       type="number"
       validation={{
        required: "Stop Loss is Required!",
        min: {
          value: 0,
          message: "Please enter a positive number",
        },
      valueAsNumber: true,
       }
       }
      />
         <InputField
       label="Take Profit"
       css="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
       name="takeProfit"
       placeholder="Enter Take Profit"
       register={register}
       type="number"
     
       validation={{
        
        min: {
          value: 0,
          message: "Please enter a positive number",
        },
      valueAsNumber: true,
       }
       }
      />
    <motion.button
    type="submit"
    whileHover={{scale:1.05}}
      className="hover:cursor-pointer 
inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all
disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none
focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
bg-primary text-primary-foreground hover:bg-primary/90
h-9 px-4 py-2 has-[>svg]:px-3
"

    >

        {isSubmitting ? "Calculating": "Calculate"}
    </motion.button>
  

      </form>
       </div>
        </div>
      </div>
    </div>
      </motion.div>
  )
}

export default page

