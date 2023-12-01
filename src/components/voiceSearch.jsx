import React, { useEffect } from 'react';
import annyang from 'annyang';

function VoiceSearchExample() {
  useEffect(() => {
    // Initialize annyang
    if (annyang) {
      // Define voice commands
      const commands = {
        'search for *term': (term) => {
          console.log('Voice query:', term);
          // You can perform actions based on the recognized term here
        },
      };

      // Add commands to annyang
      annyang.addCommands(commands);

      // Callback for errors during initialization
      annyang.addCallback('error', (error) => {
        console.error('Annyang error:', error);
      });

      // Start listening for voice commands
      annyang.start();

      // Log a message indicating that voice search is starting
      console.log('Voice search is starting...');
    } else {
      console.log('Voice recognition not supported');
      // Handle lack of support for speech recognition
    }

    // Clean up annyang when unmounting the component
    return () => {
      if (annyang) {
        annyang.abort();
      }
    };
  }, []);

  return (
    <div className='text-white'>
      <h1>Simple Voice Search Example</h1>
      <p>Click the button and speak to perform a search:</p>
      <button onClick={() => annyang.start()}>Start Voice Search</button>
    </div>
  );
}

export default VoiceSearchExample;
