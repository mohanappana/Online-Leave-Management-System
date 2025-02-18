import React from 'react'

const FeatureCard = ({features}) => {
  return (
    <div className="flex justify-center w-full px-20">
    <div className="grid sm:grid-cols-3 gap-10 justify-items-center w-full">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="bg-gradient-to-r from-[#cdfcff] via-[#edfffd] to-[#e9fff4] hover:bg-gradient-to-r hover:from-[#a7ffbb] hover:via-[#b8fde0] hover:to-[#a9f2ff] w-56 h-auto pb-3 border rounded-2xl flex flex-col gap-4 border-gray-500">
          <div className="flex justify-center">
            <img className="w-24 h-24 mt-10" src={feature.img} alt="presentation" />
          </div>  
          <div className="flex flex-col gap-3 items-center text-[#0053bf]">
            <p className="font-bold">{feature.heading}</p>
            <p className="text-center w-[150px] break-words">{feature.content}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default FeatureCard
