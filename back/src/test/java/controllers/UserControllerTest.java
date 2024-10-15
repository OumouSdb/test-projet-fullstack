package controllers;

import com.openclassrooms.starterjwt.controllers.UserController;
import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.mapper.UserMapper;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    @Mock
    private UserMapper userMapper;

    @Mock
    private UserDetails userDetails;

    private User user;
    private UserDto userDto;

    @BeforeEach
    public void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("john.doe@example.com");
        user.setPassword("password");

        userDto = new UserDto();
        userDto.setId(1L);
        userDto.setEmail("john.doe@example.com");
    }

    @Test
    public void findById_ShouldReturnUserDto_WhenUserExists() {

        when(userService.findById(1L)).thenReturn(user);
        when(userMapper.toDto(user)).thenReturn(userDto);

        ResponseEntity<?> response = userController.findById("1");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(userDto, response.getBody());
    }

    @Test
    public void findById_ShouldReturnNotFound_WhenUserDoesNotExist() {
        when(userService.findById(1L)).thenReturn(null);

        ResponseEntity<?> response = userController.findById("1");

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    public void findById_ShouldReturnBadRequest_WhenIdIsInvalid() {

        ResponseEntity<?> response = userController.findById("invalid-id");

        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    public void findById_ShouldReturnBadRequest_WhenIdIsEmpty() {

        ResponseEntity<?> response = userController.findById("");

        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    public void findById_ShouldReturnBadRequest_WhenIdIsNull() {

        ResponseEntity<?> response = userController.findById(null);

        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    public void delete_ShouldReturnUnauthorized_WhenUserIsNotOwner2() {
        User anotherUser = new User();
        anotherUser.setId(2L);
        anotherUser.setEmail("jane.doe@example.com");
        when(userService.findById(1L)).thenReturn(user);

        UserDetails anotherUserDetails = new UserDetailsImpl(anotherUser.getId(), anotherUser.getEmail(),
                anotherUser.getFirstName(),
                anotherUser.getLastName(),
                anotherUser.isAdmin(),
                "somePassword");

        Authentication authentication = new UsernamePasswordAuthenticationToken(anotherUserDetails, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        ResponseEntity<?> response = userController.save("1");
        assertEquals(HttpStatus.UNAUTHORIZED.value(), response.getStatusCodeValue());
    }


    @Test
    public void delete_ShouldReturnNotFound_WhenUserDoesNotExist() {

        when(userService.findById(1L)).thenReturn(null);
        ResponseEntity<?> response = userController.save("1");
        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    public void delete_ShouldReturnOk_WhenUserIsDeleted() {
        when(userService.findById(1L)).thenReturn(user);

        UserDetails userDetails = new UserDetailsImpl(user.getId(), user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.isAdmin(),
                user.getPassword());
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResponseEntity<?> response = userController.save("1");
        assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
    }


    @Test
    public void delete_ShouldReturnBadRequest_WhenIdIsInvalid() {
        ResponseEntity<?> response = userController.save("invalid-id");
        assertEquals(400, response.getStatusCodeValue());
    }

}
