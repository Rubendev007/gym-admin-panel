// Simulated API service for members with localStorage persistence

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// localStorage key
const STORAGE_KEY = 'gym_members_data';

// Get members from localStorage or use default
const getStoredMembers = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading members from localStorage:', error);
  }
  
  // Default data if nothing in storage
  return [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      plan: 'Premium',
      startDate: '2024-01-15',
      expiryDate: '2024-02-15',
      dueAmount: 0,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      plan: 'Basic',
      startDate: '2024-01-10',
      expiryDate: '2024-02-10',
      dueAmount: 50,
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      phone: '+1 (555) 456-7890',
      plan: 'Premium',
      startDate: '2023-12-20',
      expiryDate: '2024-01-20',
      dueAmount: 0,
      status: 'Expired'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 234-5678',
      plan: 'Standard',
      startDate: '2024-01-05',
      expiryDate: '2024-02-05',
      dueAmount: 25,
      status: 'Active'
    }
  ];
};

// Save members to localStorage
const saveMembers = (members) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  } catch (error) {
    console.error('Error saving members to localStorage:', error);
  }
};

// Initialize with stored data
let simulatedMembers = getStoredMembers();

// Calculate status based on expiry date
const calculateStatus = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  
  if (expiry < today) return 'Expired';
  if (expiry.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000) return 'Pending';
  return 'Active';
};

// API Functions
export const membersAPI = {
  // Get all members
  getMembers: async () => {
    await delay(800); // Simulate network delay
    console.log('API: Fetching members from localStorage');
    
    // Reload from localStorage to ensure we have latest data
    simulatedMembers = getStoredMembers();
    
    // Simulate random network error (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Network error: Failed to fetch members');
    }
    
    return {
      success: true,
      data: [...simulatedMembers],
      message: 'Members fetched successfully'
    };
  },

  // Add new member
  addMember: async (memberData) => {
    await delay(500);
    console.log('API: Adding member', memberData);
    
    // Reload current data
    simulatedMembers = getStoredMembers();
    
    const newMember = {
      id: Math.max(...simulatedMembers.map(m => m.id), 0) + 1,
      ...memberData,
      status: calculateStatus(memberData.expiryDate),
      dueAmount: parseFloat(memberData.amount) || 0
    };
    
    simulatedMembers.push(newMember);
    saveMembers(simulatedMembers); // Save to localStorage
    
    return {
      success: true,
      data: newMember,
      message: 'Member added successfully'
    };
  },

  // Update member
  updateMember: async (id, memberData) => {
    await delay(500);
    console.log('API: Updating member', id, memberData);
    
    // Reload current data
    simulatedMembers = getStoredMembers();
    
    const memberIndex = simulatedMembers.findIndex(m => m.id === id);
    if (memberIndex === -1) {
      throw new Error('Member not found');
    }
    
    const updatedMember = {
      ...simulatedMembers[memberIndex],
      ...memberData,
      status: calculateStatus(memberData.expiryDate),
      dueAmount: parseFloat(memberData.amount) || simulatedMembers[memberIndex].dueAmount
    };
    
    simulatedMembers[memberIndex] = updatedMember;
    saveMembers(simulatedMembers); // Save to localStorage
    
    return {
      success: true,
      data: updatedMember,
      message: 'Member updated successfully'
    };
  },

  // Delete member
  deleteMember: async (id) => {
    await delay(300);
    console.log('API: Deleting member', id);
    
    // Reload current data
    simulatedMembers = getStoredMembers();
    
    const memberIndex = simulatedMembers.findIndex(m => m.id === id);
    if (memberIndex === -1) {
      throw new Error('Member not found');
    }
    
    const deletedMember = simulatedMembers[memberIndex];
    simulatedMembers = simulatedMembers.filter(m => m.id !== id);
    saveMembers(simulatedMembers); // Save to localStorage
    
    return {
      success: true,
      data: deletedMember,
      message: 'Member deleted successfully'
    };
  },

  // Get member by ID
  getMember: async (id) => {
    await delay(300);
    
    // Reload current data
    simulatedMembers = getStoredMembers();
    
    const member = simulatedMembers.find(m => m.id === id);
    if (!member) {
      throw new Error('Member not found');
    }
    
    return {
      success: true,
      data: member,
      message: 'Member fetched successfully'
    };
  },

  // Clear all data (for testing/reset)
  clearData: async () => {
    localStorage.removeItem(STORAGE_KEY);
    simulatedMembers = getStoredMembers(); // This will reload defaults
    return {
      success: true,
      message: 'Data cleared successfully'
    };
  }
};

// Export for use in components
export default membersAPI;