import { Label } from '@radix-ui/react-label'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import React from 'react'
const filterData = [
  {
    filterType:"Location",
    arrays :["Delhi","NCR","Banglore","Pune","Mumbai"]
  },
  {
    filterType:"Industry",
    arrays :["Frontend Developer","Backend Developer","FullStack Developer"]
  },
  {
    filterType:"Salar",
    arrays :["0-40k","42k-1Lakh","1L-5L"]
  }
]
const FilterCard = () => {
  return (
    <div classname="w-full bg-white p-3 rounded-md">
      <h1 className='font-bold text-lg '>Filter Card</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
          filterData.map((data,index)=> (
            <div>
              <h1>{data.filterType}</h1>
              {
                data.arrays.map((item , index)=>{
                    return(
                      <div className='flex items-center'>
                        <RadioGroupItem value={item}/>
                        <Label >{item}</Label>
                      </div>
                    )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
