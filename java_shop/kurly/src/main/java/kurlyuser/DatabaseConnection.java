package kurlyuser;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
	private static final String DBURL = "jdbc:mysql://kurly_db:3306/kurly_db";
	private static final String DBID = "root";
	private static final String DBPW = "1234";
	
    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load JDBC driver.");
        }
    }
	
    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(DBURL, DBID, DBPW);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to connect to the database.");
        }
    }
	
}
