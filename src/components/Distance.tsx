"use client"
import './Distance.sass'
import {DistanceContext} from '@/provider/DistanceProvider'
import {MouseEvent, useCallback, useContext} from 'react'
type Props = {}

const NUM_DISTANCE = 18

function Distance({}: Props) {
  const {distance, methods: {setDistance}} = useContext<tDistanceContext>(DistanceContext)

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
        <div className="Distance_destination"><img src="/assets/images/img_temporal_tear.webp" srcSet="/assets/images/img_temporal_tear.webp 1x, /assets/images/img_temporal_tear@2x.webp 2x" alt='' /></div>
        <div className="Distance_meter">
          <ul className="Distance_list">
            {Array.from({length: NUM_DISTANCE}, (_, i) => {
              const distance_num = (NUM_DISTANCE - i) * 10000
              return (
                <li className="Distance_item" onClick={onClickDistance} data-distance={distance_num} key={i}>
                  <div className="Distance_dot"></div>
                  <div className="Distance_value">{distance_num.toLocaleString()} km</div>
                </li>
              )
            })}
          </ul>
          <div className="Distance_current" style={currentPosition()}><img src="/assets/images/img_terra_asteroid.webp" srcSet="/assets/images/img_rocket.webp 1x, /assets/images/img_rocket@2x.webp 2x" alt='' /></div>
        </div>
        <div className="Distance_source"><img src="/assets/images/img_terra_asteroid.webp" srcSet="/assets/images/img_terra_asteroid.webp 1x, /assets/images/img_terra_asteroid@2x.webp 2x" alt='' /></div>
      </div>
    </div>
  </>
}

export default Distance
