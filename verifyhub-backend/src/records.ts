export interface RecordItem {
  id: string;
  employeeName: string;
  verificationType: string;
  status: string;
  accessLevel: 'General User' | 'Admin';
}

export const records: RecordItem[] = [
  {
    id: 'V001',
    employeeName: 'Ananya Sharma',
    verificationType: 'Education Verification',
    status: 'Verified',
    accessLevel: 'General User'
  },
  {
    id: 'V002',
    employeeName: 'Rahul Kumar',
    verificationType: 'Employment Verification',
    status: 'Pending',
    accessLevel: 'General User'
  },
  {
    id: 'V003',
    employeeName: 'Priya Menon',
    verificationType: 'Identity Verification',
    status: 'Verified',
    accessLevel: 'Admin'
  },
  {
    id: 'V004',
    employeeName: 'Arjun Patel',
    verificationType: 'Background Verification',
    status: 'Pending',
    accessLevel: 'Admin'
  }
];