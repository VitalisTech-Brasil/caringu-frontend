import { CheckCircle } from 'lucide-react';
import info2 from '../../assets/images/info-2.svg';

const toastTypes = {
  success: {
    icon: <CheckCircle className="text-green-600" />,
    bg: 'bg-green-100',
    text: 'text-green-800'
  },
  error: {
    icon: <img src={info2} alt="Custom Icon" className="w-6 h-6" />,
    bg: 'bg-red-100',
    text: 'text-red-800'
  }
};

const CustomToast = ({ t, type = 'success', message }) => {
  const { icon, bg, text } = toastTypes[type];

  return (
    <div
      className={`flex items-center gap-3 px-5 py-4 rounded-lg shadow-md transition-all duration-300 ${bg} ${text} ${
        t.visible ? 'animate-enter' : 'animate-leave'
      }`}
    >
      {icon}
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default CustomToast;
