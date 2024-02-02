// import { Spinner, VStack } from '@chakra-ui/react'
// import React from 'react'

// const Loader = ({ color = 'yellow.500' }) => {
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

const Loader = ({ color = 'yellow.500' }) => {
    return (
        <VStack h={'100vh'} justifyContent={'center'} >
            <div class="wrapper">
                <div class="box-wrap">
                    <div class="box one"></div>
                    <div class="box two"></div>
                    <div class="box three"></div>
                    <div class="box four"></div>
                    <div class="box five"></div>
                    <div class="box six"></div>
                </div>
            </div>
        </VStack>
    )
}
export default Loader 