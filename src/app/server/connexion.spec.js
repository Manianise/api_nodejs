import { sequelize} from '../../../config/config.js'

// Function to check the database connection
export async function checkDatabaseConnection() {
  sequelize.authenticate()
  return true
}
