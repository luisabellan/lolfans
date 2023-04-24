import PropTypes from 'prop-types';
import Card from '@/components/Card';
import { ExclamationIcon } from '@heroicons/react/outline';
import tw from "twin.macro";

const Grid = ({ games = [] }) => {
  const isEmpty = games.length === 0;

  const toggleFavorite = async id => {
    // TODO: Add/remove game from the authenticated user's favorites
  };

  return isEmpty ? (
    <div tw='flex justify-center '>
      <span tw='text-red-600'>Unfortunately, there is nothing to display yet.</span>
    </div>
    
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map(game => (
        <Card key={game.id} {...game} onClickFavorite={toggleFavorite} />
      ))}
    </div>
  );
};

Grid.propTypes = {
  games: PropTypes.array,
};

export default Grid;
