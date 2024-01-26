package kurlyuser.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import kurlyuser.dao.UserDAO;
import kurlyuser.dto.CartItemDTO;
import kurlyuser.dto.UserAddressDTO;
import kurlyuser.dto.UserCartDTO;

@WebServlet("/addressupdate")
public class UserAddressServlet extends HttpServlet {
    private UserDAO userDAO = new UserDAO();
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        
        // JSON 데이터를 읽어서 UserAddressDTO로 변환
        BufferedReader reader = request.getReader();
        StringBuilder json = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            json.append(line);
        }

        ObjectMapper objectMapper = new ObjectMapper();
        UserAddressDTO userAddressDTO = objectMapper.readValue(json.toString(), UserAddressDTO.class);

        // DAO를 사용하여 주소 업데이트
        boolean success = userDAO.updateUserAddress(userAddressDTO);
        if(success) {
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"result\": \"success\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"result\": \"fail\"}");
        }
    }
    
}
