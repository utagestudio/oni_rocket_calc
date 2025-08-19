import Tank from '@/components/Results/Tank'
type Props = {
  required: number
}

function SteamTank({required}: Props) {
  const requiredTanks = Math.ceil(required / 900)

  return <>
    <Tank required={required} limitAmountPerTank={900} numberOfTanks={requiredTanks} image='img_steam_engine'></Tank>
  </>
}

export default SteamTank
