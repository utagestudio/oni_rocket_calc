import Tank from '@/components/Results/Tank'
type Props = {
  required: number
}

function SteamTank({required}: Props) {

  return <>
    <Tank required={required} limitAmountPerTank={900} numberOfTanks={1} image='img_steam_engine'></Tank>
  </>
}

export default SteamTank
