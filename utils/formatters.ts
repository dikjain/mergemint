export const formatReward = (reward: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(reward);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getDisplayName = (user: any) => {
  return user?.user_metadata?.full_name || 
         user?.user_metadata?.user_name || 
         user?.email || 
         'User';
};
