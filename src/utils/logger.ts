import debug from "debug";

// Enable all debug namespaces except socket.io-client and engine.io-client
debug.enable('*,-socket.io-client:*,-engine.io-client:*');

export enum LogLevel {
	DEBUG = 'DEBUG',
	INFO = 'INFO',
	WARN = 'WARN',
	ERROR = 'ERROR'
}

export interface LogEntry {
	timestamp: string;
	level: LogLevel;
	message: string;
	source: string;
}

export class Logger {
	private static instance: Logger;
	private logs: Map<string, LogEntry[]> = new Map();
	private maxLogs: number = 100;

	private constructor() {}

	static getInstance(): Logger {
		if (!Logger.instance) {
			Logger.instance = new Logger();
		}
		return Logger.instance;
	}

	private formatTimestamp(): string {
		return new Date().toLocaleTimeString();
	}

	private addLog(source: string, level: LogLevel, message: string) {
		if (!this.logs.has(source)) {
			console.log(`Setting up logger for ${source}`);
			this.logs.set(source, []);
		}

		const sourceLogs = this.logs.get(source)!;
		const entry: LogEntry = {
			timestamp: this.formatTimestamp(),
			level,
			message,
			source
		};

		sourceLogs.unshift(entry); // Add to the beginning
		if (sourceLogs.length > this.maxLogs) {
			sourceLogs.pop(); // Remove from the end
		}

		// Also log to debug if it's a debug message
		if (level === LogLevel.DEBUG) {
			const debugLogger = debug(source);
			debugLogger(message);
		}
	}

	debug(source: string, message: string) {
		this.addLog(source, LogLevel.DEBUG, message);
	}

	info(source: string, message: string) {
		this.addLog(source, LogLevel.INFO, message);
	}

	warn(source: string, message: string) {
		this.addLog(source, LogLevel.WARN, message);
	}

	error(source: string, message: string) {
		this.addLog(source, LogLevel.ERROR, message);
	}

	getLogs(source: string): LogEntry[] {
		return this.logs.get(source) || [];
	}

	getAllLogs(): LogEntry[] {
		const allLogs: LogEntry[] = [];
		for (const sourceLogs of this.logs.values()) {
			allLogs.push(...sourceLogs);
		}
		return allLogs.sort((a, b) => {
			return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
		});
	}

	clearLogs(source: string) {
		this.logs.set(source, []);
	}

	clearAllLogs() {
		this.logs.clear();
	}

	formatLogEntry(entry: LogEntry): string {
		return `[${entry.timestamp}] [${entry.level}] [${entry.source}] ${entry.message}`;
	}

	getFormattedLogs(source: string): string {
		return this.getLogs(source)
			.map(entry => this.formatLogEntry(entry))
			.join('\n');
	}

	getAllFormattedLogs(): string {
		return this.getAllLogs()
			.map(entry => this.formatLogEntry(entry))
			.join('\n');
	}
}
