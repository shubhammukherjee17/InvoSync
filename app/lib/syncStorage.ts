/* eslint-disable @typescript-eslint/no-explicit-any */
// Cloud Sync Storage Utility
// This provides localStorage with optional cloud sync capability

export interface SyncData {
  key: string;
  value: string;
  timestamp: number;
  deviceId: string;
}

class SyncStorage {
  private deviceId: string;
  private syncEnabled: boolean = false;
  private syncEndpoint: string = '/api/sync'; // Would be your backend API

  constructor() {
    this.deviceId = this.getOrCreateDeviceId();
  }

  private getOrCreateDeviceId(): string {
    if (typeof window === 'undefined') {
      return 'server';
    }
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
      deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
  }

  // Save data locally and optionally sync to cloud
  async save(key: string, value: any): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const stringValue = JSON.stringify(value);
    const timestamp = Date.now();
    
    // Save locally
    localStorage.setItem(key, stringValue);
    localStorage.setItem(`${key}_timestamp`, timestamp.toString());
    
    // Sync to cloud if enabled
    if (this.syncEnabled) {
      try {
        await this.syncToCloud(key, stringValue, timestamp);
      } catch (error) {
        console.log('Cloud sync failed, data saved locally:', error);
      }
    }
  }

  // Load data from local storage or cloud
  async load(key: string): Promise<any | null> {
    if (typeof window === 'undefined') return null;
    
    // Try local first
    const localValue = localStorage.getItem(key);
    const localTimestamp = parseInt(localStorage.getItem(`${key}_timestamp`) || '0');

    // If sync enabled, check cloud for newer version
    if (this.syncEnabled) {
      try {
        const cloudData = await this.loadFromCloud(key);
        if (cloudData && cloudData.timestamp > localTimestamp) {
          // Cloud version is newer
          localStorage.setItem(key, cloudData.value);
          localStorage.setItem(`${key}_timestamp`, cloudData.timestamp.toString());
          return JSON.parse(cloudData.value);
        }
      } catch (error) {
        console.log('Cloud load failed, using local data:', error);
      }
    }

    return localValue ? JSON.parse(localValue) : null;
  }

  // Get all saved drafts
  getAllDrafts(prefix: string): Array<{ key: string; data: any; timestamp: number }> {
    if (typeof window === 'undefined') return [];
    
    const drafts: Array<{ key: string; data: any; timestamp: number }> = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix) && !key.endsWith('_timestamp')) {
        const value = localStorage.getItem(key);
        const timestamp = parseInt(localStorage.getItem(`${key}_timestamp`) || '0');
        if (value) {
          drafts.push({
            key,
            data: JSON.parse(value),
            timestamp,
          });
        }
      }
    }

    return drafts.sort((a, b) => b.timestamp - a.timestamp);
  }

  // Delete a draft
  delete(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_timestamp`);
  }

  // Enable cloud sync
  enableSync(): void {
    if (typeof window === 'undefined') return;
    this.syncEnabled = true;
    localStorage.setItem('sync_enabled', 'true');
  }

  // Disable cloud sync
  disableSync(): void {
    if (typeof window === 'undefined') return;
    this.syncEnabled = false;
    localStorage.setItem('sync_enabled', 'false');
  }

  // Check if sync is enabled
  isSyncEnabled(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('sync_enabled') === 'true';
  }

  // Sync to cloud (mock implementation - would call real API)
  private async syncToCloud(key: string, value: string, timestamp: number): Promise<void> {
    // Mock implementation - in production, this would call your backend API
    // Example:
    // await fetch(this.syncEndpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ key, value, timestamp, deviceId: this.deviceId })
    // });
    
    // For now, just simulate network delay
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Load from cloud (mock implementation)
  private async loadFromCloud(key: string): Promise<SyncData | null> {
    // Mock implementation - in production, this would call your backend API
    // Example:
    // const response = await fetch(`${this.syncEndpoint}/${key}?deviceId=${this.deviceId}`);
    // return await response.json();
    
    return null;
  }

  // Export all data for backup
  exportAllData(): string {
    if (typeof window === 'undefined') return '{}';
    
    const data: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        data[key] = localStorage.getItem(key);
      }
    }
    return JSON.stringify(data, null, 2);
  }

  // Import data from backup
  importData(jsonString: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      const data = JSON.parse(jsonString);
      Object.keys(data).forEach(key => {
        localStorage.setItem(key, data[key]);
      });
      alert('Data imported successfully!');
    } catch (error) {
      alert('Failed to import data. Please check the file format.');
    }
  }
}

export const syncStorage = new SyncStorage();
