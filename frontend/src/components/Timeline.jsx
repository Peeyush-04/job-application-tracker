import React from 'react';
import { motion } from 'framer-motion';

const Timeline = ({ history }) => {
  return (
    <div className="relative border-l-4 border-blue-500 pl-4 ml-4">
      {history.map((entry, index) => (
        <motion.div
          key={index}
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="absolute -left-[14px] top-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
          <div>
            <p className="text-sm text-gray-500">{new Date(entry.changedAt).toLocaleString()}</p>
            <p className="text-lg font-semibold">{entry.status}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
