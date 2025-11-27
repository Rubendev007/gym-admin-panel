import axios from 'axios';

// localStorage key
const STORAGE_KEY = 'gym_plans_data';

// Get plans from localStorage or use default
const getStoredPlans = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading plans from localStorage:', error);
  }
  
  // Default plans data
  return [
    {
      id: 1,
      name: 'Basic Plan',
      duration: 1,
      price: 30,
      tax: 5,
      description: 'Perfect for beginners with access to basic equipment',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Standard Plan', 
      duration: 3,
      price: 80,
      tax: 12,
      description: 'Great value with 3-month commitment',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Premium Plan',
      duration: 6,
      price: 150,
      tax: 22.5,
      description: 'Best value with premium amenities access',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Annual Elite',
      duration: 12,
      price: 280,
      tax: 42,
      description: 'Full year access with all premium features',
      status: 'Active'
    }
  ];
};

// Save plans to localStorage
const savePlans = (plans) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  } catch (error) {
    console.error('Error saving plans to localStorage:', error);
  }
};

// Initialize with stored data
let simulatedPlans = getStoredPlans();

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions
export const plansAPI = {
  // Get all plans
  getPlans: async () => {
    await delay(600);
    
    // Simulate random network error (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Network error: Failed to fetch plans');
    }
    
    // Reload from localStorage
    simulatedPlans = getStoredPlans();
    
    return {
      data: {
        success: true,
        data: [...simulatedPlans],
        message: 'Plans fetched successfully'
      }
    };
  },

  // Add new plan
  addPlan: async (planData) => {
    await delay(500);
    
    // Reload current data
    simulatedPlans = getStoredPlans();
    
    const newPlan = {
      id: Math.max(...simulatedPlans.map(p => p.id), 0) + 1,
      ...planData,
      status: 'Active'
    };
    
    simulatedPlans.push(newPlan);
    savePlans(simulatedPlans);
    
    return {
      data: {
        success: true,
        data: newPlan,
        message: 'Plan added successfully'
      }
    };
  },

  // Update plan
  updatePlan: async (id, planData) => {
    await delay(500);
    
    // Reload current data
    simulatedPlans = getStoredPlans();
    
    const planIndex = simulatedPlans.findIndex(p => p.id === id);
    if (planIndex === -1) {
      const error = new Error('Plan not found');
      error.response = { status: 404 };
      throw error;
    }
    
    const updatedPlan = {
      ...simulatedPlans[planIndex],
      ...planData
    };
    
    simulatedPlans[planIndex] = updatedPlan;
    savePlans(simulatedPlans);
    
    return {
      data: {
        success: true,
        data: updatedPlan,
        message: 'Plan updated successfully'
      }
    };
  },

  // Delete plan
  deletePlan: async (id) => {
    await delay(300);
    
    // Reload current data
    simulatedPlans = getStoredPlans();
    
    const planIndex = simulatedPlans.findIndex(p => p.id === id);
    if (planIndex === -1) {
      const error = new Error('Plan not found');
      error.response = { status: 404 };
      throw error;
    }
    
    const deletedPlan = simulatedPlans[planIndex];
    simulatedPlans = simulatedPlans.filter(p => p.id !== id);
    savePlans(simulatedPlans);
    
    return {
      data: {
        success: true,
        data: deletedPlan,
        message: 'Plan deleted successfully'
      }
    };
  },

  // Clear all data (for testing/reset)
  clearData: async () => {
    localStorage.removeItem(STORAGE_KEY);
    simulatedPlans = getStoredPlans();
    return {
      data: {
        success: true,
        message: 'Plans data cleared successfully'
      }
    };
  }
};

export default plansAPI;