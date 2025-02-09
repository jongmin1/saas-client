export function getTextColorClass(type: string): string {
    switch (type) {
      case 'critical':
        return 'text-critical';
      case 'warning':
        return 'text-warning';
      case 'info':
        return 'text-info';
      case 'debug':
        return 'text-debug';
      case 'error':
        return 'text-error';
      default:
        return 'text-light';
    }
  }
  