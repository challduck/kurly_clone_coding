package kurlyuser.controller;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import kurlyuser.dao.UserDAO;
import kurlyuser.dto.UserAddressDTO;

@WebServlet("/addressget")
public class UserAddressGetServlet extends HttpServlet {
	private UserDAO userDao = new UserDAO();
	
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        
        BufferedReader reader = request.getReader();
        StringBuilder json = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            json.append(line);
        }

        ObjectMapper objectMapper = new ObjectMapper();
        UserAddressDTO userAddressDTO = objectMapper.readValue(json.toString(), UserAddressDTO.class);

        UserAddressDTO resultUserAddressDTO = userDao.getUserAddress(userAddressDTO);

        String userAddressJson = objectMapper.writeValueAsString(resultUserAddressDTO);
        
        if(userAddressJson != null) {
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(userAddressJson);
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"result\": \"fail\"}");
        }
    }
    
}
