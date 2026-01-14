import { useState, useCallback, useEffect } from 'react';
import type { Alarm, AppScreen } from './types';
import { useAlarms } from './hooks/useAlarms';
import { useAlarmTrigger } from './hooks/useAlarmTrigger';
import { requestNotificationPermission } from './utils/audio';
import { HomeScreen } from './components/HomeScreen';
import { AlarmCreator } from './components/AlarmCreator';
import { DuaDismissal } from './components/DuaDismissal';
import { DhikrDismissal } from './components/DhikrDismissal';
import { PostAlarmScreen } from './components/PostAlarmScreen';
import './index.css';

function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [editingAlarm, setEditingAlarm] = useState<Alarm | null>(null);
  const [_activeAlarm, setActiveAlarm] = useState<Alarm | null>(null);

  const { alarms, addAlarm, updateAlarm, deleteAlarm, toggleAlarm } = useAlarms();

  // Request notification permission on mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const handleAlarmTriggered = useCallback((alarm: Alarm) => {
    setActiveAlarm(alarm);
    setScreen(alarm.dismissType === 'dua' ? 'dua-dismissal' : 'alarm-active');
  }, []);

  const { stopAlarm } = useAlarmTrigger({
    alarms,
    onAlarmTriggered: handleAlarmTriggered,
  });

  const handleCreateAlarm = () => {
    setEditingAlarm(null);
    setScreen('create');
  };

  const handleEditAlarm = (alarm: Alarm) => {
    setEditingAlarm(alarm);
    setScreen('edit');
  };

  const handleSaveAlarm = (alarmData: Omit<Alarm, 'id'>) => {
    if (editingAlarm) {
      updateAlarm(editingAlarm.id, alarmData);
    } else {
      addAlarm(alarmData);
    }
    setEditingAlarm(null);
    setScreen('home');
  };

  const handleCancelEdit = () => {
    setEditingAlarm(null);
    setScreen('home');
  };

  const handleDismissalComplete = () => {
    stopAlarm();
    setScreen('post-alarm');
  };

  const handlePostAlarmDismiss = () => {
    setActiveAlarm(null);
    setScreen('home');
  };

  // Render current screen
  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <HomeScreen
            alarms={alarms}
            onCreateAlarm={handleCreateAlarm}
            onEditAlarm={handleEditAlarm}
            onToggleAlarm={toggleAlarm}
            onDeleteAlarm={deleteAlarm}
          />
        );

      case 'create':
      case 'edit':
        return (
          <AlarmCreator
            alarm={editingAlarm}
            onSave={handleSaveAlarm}
            onCancel={handleCancelEdit}
          />
        );

      case 'dua-dismissal':
        return <DuaDismissal onComplete={handleDismissalComplete} />;

      case 'alarm-active':
        return <DhikrDismissal onComplete={handleDismissalComplete} />;

      case 'post-alarm':
        return <PostAlarmScreen onDismiss={handlePostAlarmDismiss} />;

      default:
        return null;
    }
  };

  return (
    <div className="font-['Inter',system-ui,sans-serif] antialiased">
      {renderScreen()}
    </div>
  );
}

export default App;
