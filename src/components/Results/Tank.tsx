import './Tank.sass'
import useAmount from '@/hooks/useAmount'
import React from 'react'
import Image from 'next/image'
import {getImageDimensions} from '@/lib/imageDimensions'
type Props = {
  required: number
  limitAmountPerTank: number
  numberOfTanks: number
  image: string
}

function Tank({required, limitAmountPerTank, numberOfTanks, image, children}: React.PropsWithChildren<Props>) {
  const {isCalculating} = useAmount()
  const dimensions = getImageDimensions(image)

  return <>
    <div className="Tank">
      <div className="Tank_option">
        {children}
      </div>
      <ul className="Tank_list">
        {Array.from({length: Math.max(1, numberOfTanks)}, (_, i) => {
          const capacity = numberOfTanks === i + 1 ? (required % limitAmountPerTank) : limitAmountPerTank

          return <li className="Tank_item" key={i}>
            <div className="Tank_image">
              <Image
                className="Tank_img"
                src={`/assets/images/${image}.webp`}
                width={dimensions.width}
                height={dimensions.height}
                alt=""
                unoptimized
              />
            </div>
            <div className="Tank_capacity">
              <div className="Tank_value">{isCalculating || required <= 0 ? '---' : capacity.toLocaleString()}</div>
              <div className="Tank_unit">kg</div>
            </div>
          </li>
        })}
      </ul>
    </div>
  </>
}

export default Tank
