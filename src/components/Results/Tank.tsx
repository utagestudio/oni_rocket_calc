import './Tank.sass'
import useAmount from '@/hooks/useAmount'
import React from 'react'
import AssetImage from '@/components/AssetImage'
type Props = {
  required: number
  limitAmountPerTank: number
  numberOfTanks: number
  image: string
}

function Tank({required, limitAmountPerTank, numberOfTanks, image, children}: React.PropsWithChildren<Props>) {
  const {isCalculating} = useAmount()

  return <>
    <div className="Tank">
      <div className="Tank_option">
        {children}
      </div>
      <ul className="Tank_list">
        {Array.from({length: Math.max(1, numberOfTanks)}, (_, i) => {
          const capacity = numberOfTanks === i + 1 ? (required % limitAmountPerTank) : limitAmountPerTank
          // 同じタンク画像が複数並ぶため、画像種別とスロット番号で各タンクを識別する。
          const tankKey = `${image}:tank-${i + 1}`

          return <li className="Tank_item" key={tankKey}>
            <div className="Tank_image">
              <AssetImage
                className="Tank_img"
                imageName={`${image}.webp`}
                alt=""
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
