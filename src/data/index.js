import { boysBasketballTeams } from './boysBasketballTeams.js';
import { boysBasketballTeamRankings } from './boysBasketballTeamRankings.js';
import { staff } from './staff.js';

export const availableDataFiles = {
  'boysBasketballTeams.js': null,
  'boysBasketballTeamRankings.js': null,
  'staff.js': null,
  'games.js': null,
  'rosters.js': null
};

export async function getSelectedData(selectedFiles) {
  const loadedData = {};
  
  for (const filename of selectedFiles) {
    switch (filename) {
      case 'boysBasketballTeams.js':
        loadedData.teams = boysBasketballTeams.teams;
        break;
      case 'boysBasketballTeamRankings.js':
        loadedData.rankings = boysBasketballTeamRankings.rankings;
        break;
      case 'staff.js':
        loadedData.staff = staff.staff;
        break;
      // games.js and rosters.js would be handled similarly when available
    }
  }
  
  return loadedData;
}