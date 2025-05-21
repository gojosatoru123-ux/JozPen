import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const typeStyles = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

const MessageSlab=({ type, message, url=null,duration = 3000 })=>{
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`fixed z-11 flex gap-2 items-center justify-between right-0 top-0 transition-opacity duration-500 ease-in-out opacity-100 w-full max-w-md mx-auto my-4 border-l-4 p-4 rounded shadow-sm ${typeStyles[type]}`}>
      <p className="text-sm font-medium">{message}</p>
      {url!=null && <Link href={url} className='border rounded p-2 flex gap-2'>Visit <ExternalLink/></Link>}
    </div>
  );
}

export default MessageSlab;