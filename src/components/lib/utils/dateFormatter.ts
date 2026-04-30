export function formatDateENGB (date:string){
    const formatDate = new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
          return formatDate
}

export function formatDateENUS (date:string){
    const formatDate = new Date(date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
          return formatDate
}

export const todayDate = new Date().toISOString().split('T')[0];