// import { Spinner, VStack } from '@chakra-ui/react'
// import React from 'react'

// const Loader = ({ color = 'pink.500' }) => {
//     return (
//         <VStack h={'100vh'} justifyContent={'center'}>
//             <div style={{ transform: 'scale(3)' }}>
//                 <Spinner
//                     thickness='3px'
//                     speed='0.65s'
//                     emptyColor='transparent'
//                     color={color}
//                     size={'xl'}
//                 />
//             </div>
//         </VStack>
//     )
// }
// export default Loader 
// import Spline from '@splinetool/react-spline';

// export default function App() {
//     return (
//         <Spline scene="https://prod.spline.design/nw6MjdSISoh8X6SE/scene.splinecode" />
//     );
// }
// import Spline from '@splinetool/react-spline';

// export default function Loader() {
//   return (
//     <Spline scene="https://prod.spline.design/LqpYw4dtaY1IFOZx/scene.splinecode" />
//   );
// }

// import Spline from '@splinetool/react-spline';

// export default function Loader() {
//   return (
//     <Spline scene="https://prod.spline.design/rVZQRNCS4IkMXz9a/scene.splinecode" />
//   );
// } 



// import React from 'react';
import './Loader.scss'

// const Loader = () => {
//     return (
//         <div className="body">

//         </div>
//     );
// };

// export default Loader;

import { VStack } from '@chakra-ui/react'

const Loader = ({ color = 'pink.500' }) => {
    return (
        <VStack h={'100vh'} justifyContent={'center'} >
            <div className="wrapper">
                <div className="box-wrap">
                    <div className="box one"></div>
                    <div className="box two"></div>
                    <div className="box three"></div>
                    <div className="box four"></div>
                    <div className="box five"></div>
                    <div className="box six"></div>
                </div>
            </div>
        </VStack>
    )
}
export default Loader 