import { useFormStatus } from 'react-dom';
import { FaPaperPlane } from 'react-icons/fa';

const SubmitMessageButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
    className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full w-full focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 flex items-center justify-center shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"

      type='submit'
      disabled={pending}
    >
      <FaPaperPlane className='mr-2' />{' '}
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
};


export default SubmitMessageButton;