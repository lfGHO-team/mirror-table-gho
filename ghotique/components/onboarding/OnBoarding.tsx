import { ConnectKitButton } from 'connectkit';
import React, { useEffect, useState } from 'react'
import key from '../../assets/images/key.webp'
import bridge from '../../assets/images/bridge.webp'
import tree from '../../assets/images/tree.webp'
import Image from 'next/image';

const children = (
  <div className=' bg-[#45ea68] text-black px-4 py-2 rounded-lg'>Ingresar!</div>
) as React.ReactElement;

const OnBoarding = () => {

  const [step, setStep] = useState(1)

  const stepImages = [
    key,
    bridge,
    tree
  ];

  const onboardingContent = [
    {
      title: "Unlock Your Investment Potential",
      subtitle: "Begin your journey with Ghothique, where cutting-edge web3 technology meets seamless investment solutions."
    },
    {
      title: "Streamline Your Success",
      subtitle: "Our platform bridges the gap between innovative founders and forward-thinking investors, ensuring your path to growth is clear and straightforward."
    },
    {
      title: "Empower Your Investments",
      subtitle: "You're all set to make your mark in the investment world. Become part of a revolutionary movement towards a smarter, more connected financial future."
    }
  ];

  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === 'ArrowRight') {
        setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
      } else if (event.key === 'ArrowLeft') {
        setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
      }
    };

    // Add event listener for the keyboard events
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <div className='h-screen bg-[#0b111b] flex flex-col items-center justify-around px-4'>
      <div className="flex justify-end w-full h-6 text-white">
        {step !== 3 && (
          <span onClick={() => setStep(3)} style={{ cursor: 'pointer' }}>Skip</span>
        )}
      </div>
      <div className="w-1/3 h-1/3 md:w-1/5 flex items-center justify-center border-8 rounded-full overflow-hidden relative">
        <Image src={stepImages[step - 1]} alt={`Step ${step}`} layout="fill" objectFit="cover" />
      </div>
      <div className='space-y-2 text-center'>
        <h3 className='text-2xl text-white'>{onboardingContent[step - 1].title}</h3>
        <p className='text-white text-sm md:text-base max-w-md'>{onboardingContent[step - 1].subtitle}</p>
      </div>
      <div className='flex justify-between items-baseline w-full'>
        <div>
          <div className='flex justify-center space-x-2'>
            {onboardingContent.map((_, index) => (
              <div key={index} className={`h-2 rounded-full ${step === index + 1 ? 'bg-[#45ea68] w-4' : 'bg-[#313133] w-2'}`} onClick={() => setStep(index + 1)} style={{ cursor: 'pointer' }}></div>
            ))}
          </div>
        </div>
        {step === 3 ? (
          <ConnectKitButton theme='midnight' />
        ) : (
          <button className='bg-[#45ea68] text-black px-4 py-2 rounded-lg' onClick={() => setStep(step + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default OnBoarding