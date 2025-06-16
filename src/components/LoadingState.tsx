// type LoadingStateProps = {
//   loading: boolean;
//   error: string | null;
// };

// export default function LoadingState({ loading, error }: LoadingStateProps) {
//   if (loading) {
//     return (
//       <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
//         <div className="flex items-center justify-center space-x-3">
//           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
//           <p className="text-white/90 text-lg">Cargando clima por ubicación...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-6 border border-red-500/30 text-center">
//         <p className="text-red-200">{error}</p>
//       </div>
//     );
//   }

//   return null;
// }
