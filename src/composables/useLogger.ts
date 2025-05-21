import { ref, watch } from 'vue';
import { Logger, type LogEntry } from '@/utils/logger';

export function useLogger(source: string) {
  const logger = Logger.getInstance();
  const logs = ref<LogEntry[]>([]);
  const formattedLogs = ref('');

  const updateLogs = () => {
    if (source === 'all') {
      logs.value = logger.getAllLogs();
      formattedLogs.value = logger.getAllFormattedLogs();
    } else {
      logs.value = logger.getLogs(source);
      formattedLogs.value = logger.getFormattedLogs(source);
    }
  };

  // Initial update
  updateLogs();

  // Watch for changes in the logger's logs
  watch(
    () => {
      // Create a new array to force reactivity
      return [...logger.getAllLogs()];
    },
    () => {
      updateLogs();
    },
    { deep: true }
  );

  const debug = (message: string) => {
    logger.debug(source, message);
    updateLogs();
  };

  const info = (message: string) => {
    logger.info(source, message);
    updateLogs();
  };

  const warn = (message: string) => {
    logger.warn(source, message);
    updateLogs();
  };

  const error = (message: string) => {
    logger.error(source, message);
    updateLogs();
  };

  const clear = () => {
    if (source === 'all') {
      logger.clearAllLogs();
    } else {
      logger.clearLogs(source);
    }
    updateLogs();
  };

  return {
    logs,
    formattedLogs,
    debug,
    info,
    warn,
    error,
    clear
  };
} 