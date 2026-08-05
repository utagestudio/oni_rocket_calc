"use client"

import './Distance.sass'
import {useDistanceContext} from '@/provider/DistanceProvider'
import {MouseEvent, useCallback} from 'react'
import AssetImage from '@/components/AssetImage'
type Props = {}

const NUM_DISTANCE = 18

function Distance({}: Props) {
  const {distance, methods: {setDistance}} = useDistanceContext()

  const onClickDistance = useCallback((e:MouseEvent<HTMLLIElement>) =>{
    const value = parseInt(e.currentTarget.dataset.distance as string) || 10000
    setDistance(value)
  }, [])

  const currentPosition = useCallback(() => {
    return {
      bottom: `${((distance/10000) - 1) * 32}px`,
    }
  }, [distance])

  return <>
    <div className="Distance">
      <div className="Distance_wrap">
        <div className="Distance_destination">
          <AssetImage imageName="img_temporal_tear.webp" alt="" />
        </div>
        <div className="Distance_meter">
          <ul className="Distance_list">
            {Array.from({length: NUM_DISTANCE}, (_, i) => {
              const distance_num = (NUM_DISTANCE - i) * 10000
              return (
                <li className="Distance_item" onClick={onClickDistance} data-distance={distance_num} key={`distance-${distance_num}`}>
                  <div className="Distance_dot"></div>
                  <div className="Distance_value">{distance_num.toLocaleString()} km</div>
                </li>
              )
            })}
          </ul>
          <div className="Distance_current" style={currentPosition()}>
            <AssetImage imageName="img_rocket.webp" alt="" />
          </div>
        </div>
        <div className="Distance_source">
          <AssetImage imageName="img_terra_asteroid.webp" alt="" />
        </div>
      </div>
    </div>
  </>
}

export default Distance
