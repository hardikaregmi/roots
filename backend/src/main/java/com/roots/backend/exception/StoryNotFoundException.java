package com.roots.backend.exception;

public class StoryNotFoundException extends RuntimeException {

    public StoryNotFoundException(Long id) {
        super("Story not found with id: " + id);
    }
}
