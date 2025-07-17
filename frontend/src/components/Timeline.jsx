import { motion } from "framer-motion";

export default function Timeline({ history }) {
  return (
    <div className="timeline-container">
      {history.map((e, i) => (
        <motion.div
          key={i}
          className="timeline-entry"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="timeline-dot" />
          <div>
            <p className="timeline-date">
              {new Date(e.changedAt).toLocaleString()}
            </p>
            <p className="timeline-status">{e.status}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
