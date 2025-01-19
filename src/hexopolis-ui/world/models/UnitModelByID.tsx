import { lazy, Suspense } from 'react'
import { GameUnit } from '../../../game/types'

export const UnitModelByID = ({
  gameUnit,
  isHovered,
}: {
  gameUnit: GameUnit
  isHovered: boolean
}) => {
  const { armyCardID, modelIndex } = gameUnit
  switch (armyCardID) {
    case 'hs1000':
      // marro warriors
      if (modelIndex === 0)
        // return <MarroWarriors1PlainModel gameUnit={gameUnit} isHovered={isHovered} />
        return (
          <Suspense fallback={<></>}>
            <MarroWarrior1 gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 1)
        // return <Suspense fallback={<></>}><MarroWarriors2PlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
        return (
          <Suspense fallback={<></>}>
            <MarroWarrior2 gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 2)
        // return <Suspense fallback={<></>}><MarroWarriors3PlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
        return (
          <Suspense fallback={<></>}>
            <MarroWarrior3 gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 3)
        // return <Suspense fallback={<></>}><MarroWarriors4PlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
        return (
          <Suspense fallback={<></>}>
            <MarroWarrior4 gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      return (
        <Suspense fallback={<></>}>
          <MarroWarrior1 gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1001':
      // deathwalker 9000
      // return <Suspense fallback={<></>}><D9000PlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
      return (
        <Suspense fallback={<></>}>
          <Deathwalker9000Model gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1002':
      // izumi
      if (modelIndex === 0)
        return (
          <Suspense fallback={<></>}>
            <Izumi1PlainModel gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 1)
        return (
          <Suspense fallback={<></>}>
            <Izumi2PlainModel gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 2)
        return (
          <Suspense fallback={<></>}>
            <Izumi3PlainModel gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      return (
        <Suspense fallback={<></>}>
          <Izumi1PlainModel gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1003':
      // sgt drake
      // return <Suspense fallback={<></>}><SgtDrakePlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
      return (
        <Suspense fallback={<></>}>
          <SgtDrakeModel gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1004':
      // syvarris
      // return <Suspense fallback={<></>}><SyvarrisPlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
      return (
        <Suspense fallback={<></>}>
          <SyvarrisModel gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1005':
      if (modelIndex === 0)
        // return <Suspense fallback={<></>}><Krav1PlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
        return (
          <Suspense fallback={<></>}>
            <Krav1Model gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 1)
        // return <Suspense fallback={<></>}><Krav2PlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
        return (
          <Suspense fallback={<></>}>
            <Krav2Model gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 2)
        // return <Suspense fallback={<></>}><Krav3PlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
        return (
          <Suspense fallback={<></>}>
            <Krav3Model gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      return (
        <Suspense fallback={<></>}>
          <Krav1Model gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1006':
      if (modelIndex === 0)
        return (
          <Suspense fallback={<></>}>
            <Tarn1PlainModel gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 1)
        return (
          <Suspense fallback={<></>}>
            <Tarn2PlainModel gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 2)
        return (
          <Suspense fallback={<></>}>
            <Tarn3PlainModel gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 3)
        return (
          <Suspense fallback={<></>}>
            <Tarn4PlainModel gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      return (
        <Suspense fallback={<></>}>
          <Tarn1PlainModel gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1007':
      // agent carr
      // return <Suspense fallback={<></>}><AgentCarrPlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
      return (
        <Suspense fallback={<></>}>
          <AgentCarrModel gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1008':
      // zettian guards
      if (modelIndex === 0)
        return (
          <Suspense fallback={<></>}>
            <Zettian1PlainModel gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 1)
        return (
          <Suspense fallback={<></>}>
            <Zettian2PlainModel gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      return (
        <Suspense fallback={<></>}>
          <Zettian1PlainModel gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1009':
      if (modelIndex === 0)
        // return <Suspense fallback={<></>}><Airborn1PlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
        return (
          <Suspense fallback={<></>}>
            <AirbornElite1 gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 1)
        // return <Suspense fallback={<></>}><Airborn2PlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
        return (
          <Suspense fallback={<></>}>
            <AirbornElite2 gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 2)
        // return <Suspense fallback={<></>}><Airborn3PlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
        return (
          <Suspense fallback={<></>}>
            <AirbornElite3 gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      if (modelIndex === 3)
        // return <Suspense fallback={<></>}><Airborn4PlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
        return (
          <Suspense fallback={<></>}>
            <AirbornElite4 gameUnit={gameUnit} isHovered={isHovered} />
          </Suspense>
        )
      // return <Suspense fallback={<></>}><Airborn1PlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
      return (
        <Suspense fallback={<></>}>
          <AirbornElite1 gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1010':
      return (
        <Suspense fallback={<></>}>
          <FinnPlainModel gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1011':
      // return <Suspense fallback={<></>}><ThorgrimPlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
      return (
        <Suspense fallback={<></>}>
          <ThorgrimModel gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1012':
      // return <Suspense fallback={<></>}><Raelin1PlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
      return (
        <Suspense fallback={<></>}>
          <RaelinRotvModel gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1013':
      // return <Suspense fallback={<></>}><MimringPlainModel gameUnit={gameUnit} isHovered={isHovered} /></Suspense>
      return (
        <Suspense fallback={<></>}>
          <MimringModel gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1014':
      // ne gok sa
      return (
        <Suspense fallback={<></>}>
          <NeGokSaPlainModel gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    case 'hs1015':
      // grimnak
      return (
        <Suspense fallback={<></>}>
          <GrimnakPlainModel gameUnit={gameUnit} isHovered={isHovered} />
        </Suspense>
      )
    default:
      return null
  }
}
// import {
//   Tarn1PlainModel,
//   Tarn2PlainModel,
//   Tarn3PlainModel,
//   Tarn4PlainModel,
//   Izumi1PlainModel,
//   Izumi2PlainModel,
//   Izumi3PlainModel,
//   FinnPlainModel,
//   GrimnakPlainModel,
//   NeGokSaPlainModel,
//   Zettian1PlainModel,
//   Zettian2PlainModel,
//   // Krav1PlainModel,
//   // Krav2PlainModel,
//   // Krav3PlainModel,
//   // ThorgrimPlainModel,
//   // AgentCarrPlainModel,
//   // Airborn1PlainModel,
//   // Airborn2PlainModel,
//   // Airborn3PlainModel,
//   // Airborn4PlainModel,
//   // SgtDrakePlainModel,
//   // D9000PlainModel,
//   // Raelin1PlainModel,
//   // SyvarrisPlainModel,
//   // MimringPlainModel,
//   // MarroWarriors1PlainModel,
//   // MarroWarriors2PlainModel,
//   // MarroWarriors3PlainModel,
//   // MarroWarriors4PlainModel,
// } from './PlainModels'
const Tarn1PlainModel = lazy(() =>
  import('./PlainModels').then((module) => ({
    default: module.Tarn1PlainModel,
  }))
)
const Tarn2PlainModel = lazy(() =>
  import('./PlainModels').then((module) => ({
    default: module.Tarn2PlainModel,
  }))
)
const Tarn3PlainModel = lazy(() =>
  import('./PlainModels').then((module) => ({
    default: module.Tarn3PlainModel,
  }))
)
const Tarn4PlainModel = lazy(() =>
  import('./PlainModels').then((module) => ({
    default: module.Tarn4PlainModel,
  }))
)
const Izumi1PlainModel = lazy(() =>
  import('./PlainModels').then((module) => ({
    default: module.Izumi1PlainModel,
  }))
)
const Izumi2PlainModel = lazy(() =>
  import('./PlainModels').then((module) => ({
    default: module.Izumi2PlainModel,
  }))
)
const Izumi3PlainModel = lazy(() =>
  import('./PlainModels').then((module) => ({
    default: module.Izumi3PlainModel,
  }))
)
const FinnPlainModel = lazy(() =>
  import('./PlainModels').then((module) => ({
    default: module.FinnPlainModel,
  }))
)
const GrimnakPlainModel = lazy(() =>
  import('./PlainModels').then((module) => ({
    default: module.GrimnakPlainModel,
  }))
)
const NeGokSaPlainModel = lazy(() =>
  import('./PlainModels').then((module) => ({
    default: module.NeGokSaPlainModel,
  }))
)
const Zettian1PlainModel = lazy(() =>
  import('./PlainModels').then((module) => ({
    default: module.Zettian1PlainModel,
  }))
)
const Zettian2PlainModel = lazy(() =>
  import('./PlainModels').then((module) => ({
    default: module.Zettian2PlainModel,
  }))
)
const MarroWarrior1 = lazy(() =>
  // named export
  // import('./unique-squad/marro-warriors/MarroWarrior1').then((module) => ({
  //   default: module.MarroWarrior1,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.MarroWarriors1PlainModel,
  }))
)
const MarroWarrior2 = lazy(() =>
  // named export
  // import('./unique-squad/marro-warriors/MarroWarrior2').then((module) => ({
  //   default: module.MarroWarrior2,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.MarroWarriors2PlainModel,
  }))
)
const MarroWarrior3 = lazy(() =>
  // named export
  // import('./unique-squad/marro-warriors/MarroWarrior3').then((module) => ({
  //   default: module.MarroWarrior3,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.MarroWarriors3PlainModel,
  }))
)
const MarroWarrior4 = lazy(() =>
  // named export
  // import('./unique-squad/marro-warriors/MarroWarrior4').then((module) => ({
  //   default: module.MarroWarrior4,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.MarroWarriors4PlainModel,
  }))
)
const Deathwalker9000Model = lazy(() =>
  // named export
  // import('./unique-hero/Deathwalker9000Model').then((module) => ({
  //   default: module.Deathwalker9000Model,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.D9000PlainModel,
  }))
)
const SgtDrakeModel = lazy(() =>
  // named export
  // import('./unique-hero/SgtDrakeModel').then((module) => ({
  //   default: module.SgtDrakeModel,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.SgtDrakePlainModel,
  }))
)
const SyvarrisModel = lazy(() =>
  // named export
  // import('./unique-hero/SyvarrisModel').then((module) => ({
  //   default: module.SyvarrisModel,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.SyvarrisPlainModel,
  }))
)
const AgentCarrModel = lazy(() =>
  // named export
  // import('./unique-hero/AgentCarrModel').then((module) => ({
  //   default: module.AgentCarrModel,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.AgentCarrPlainModel,
  }))
)
const AirbornElite1 = lazy(() =>
  // named export
  // import('./unique-squad/airborn-elite/AirbornElite1').then((module) => ({
  //   default: module.AirbornElite1,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.Airborn1PlainModel,
  }))
)
const AirbornElite2 = lazy(() =>
  // named export
  // import('./unique-squad/airborn-elite/AirbornElite2').then((module) => ({
  //   default: module.AirbornElite2,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.Airborn2PlainModel,
  }))
)
const AirbornElite3 = lazy(() =>
  // named export
  import('./PlainModels').then((module) => ({
    default: module.Airborn3PlainModel,
  }))
)
const AirbornElite4 = lazy(() =>
  // named export
  // import('./unique-squad/airborn-elite/AirbornElite4').then((module) => ({
  //   default: module.AirbornElite4,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.Airborn4PlainModel,
  }))
)
const RaelinRotvModel = lazy(() =>
  // named export
  // import('./unique-hero/RaelinRotvModel').then((module) => ({
  //   default: module.RaelinRotvModel,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.Raelin1PlainModel,
  }))
)
const MimringModel = lazy(() =>
  // named export
  // import('./unique-hero/Mimring').then((module) => ({
  //   default: module.MimringModel,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.MimringPlainModel,
  }))
)
const Krav1Model = lazy(() =>
  // named export
  import('./PlainModels').then((module) => ({
    default: module.Krav1PlainModel,
  }))
)
const Krav2Model = lazy(() =>
  // named export
  import('./PlainModels').then((module) => ({
    default: module.Krav2PlainModel,
  }))
)
const Krav3Model = lazy(() =>
  // named export
  import('./PlainModels').then((module) => ({
    default: module.Krav3PlainModel,
  }))
)
const ThorgrimModel = lazy(() =>
  // named export
  // import('./unique-hero/ThorgrimModel').then((module) => ({
  //   default: module.ThorgrimModel,
  // }))
  import('./PlainModels').then((module) => ({
    default: module.ThorgrimPlainModel,
  }))
)

