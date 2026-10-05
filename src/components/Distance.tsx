"use client"

import './Distance.sass'
import {useDistanceContext} from '@/provider/DistanceProvider'
import {useCallback} from 'react'
import type {CSSProperties} from 'react'
import AssetImage from '@/components/AssetImage'
type Props = {}

const NUM_DISTANCE = 18

function Distance({}: Props) {
  const {distance, methods: {setDistance}} = useDistanceContext()

  const currentPosition = useCallback(() => {
    return {
      // 距離目盛りの高さをCSSと共有し、小さなPC画面でも選択位置を一致させる。
      '--distance-position': (distance / 10000) - 1,
    } as CSSProperties
  }, [distance])

  return <>
    <div className="Distance" aria-label="Target distance">
      <div className="Distance_wrap">
        <div className="Distance_destination">
          <AssetImage imageName="img_temporal_tear.webp" alt="" />
        </div>
        <div className="Distance_meter">
          <ul className="Distance_list">
            {Array.from({length: NUM_DISTANCE}, (_, i) => {
              const distance_num = (NUM_DISTANCE - i) * 10000
              return (
                <li key={`distance-${distance_num}`}>
                  <button type="button" className="Distance_item" onClick={() => setDistance(distance_num)} data-distance={distance_num} aria-label={`Target distance ${distance_num.toLocaleString('en-US')} km`} aria-pressed={distance === distance_num}>
                  <div className="Distance_dot"></div>
                  <div className="Distance_value">{distance_num.toLocaleString()} km</div>
                  </button>
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
