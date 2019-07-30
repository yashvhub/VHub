package com.yash.vhub.domain;

import org.springframework.core.convert.converter.Converter;

public class CompositeProposalCommentIdConverter implements Converter<String, CompositeProposalCommentId> {

	@Override
	public CompositeProposalCommentId convert(String source) {
		CompositeProposalCommentId compositeProposalCommentId = new CompositeProposalCommentId();
		String[] ids = source.split("_");
		compositeProposalCommentId.setProposalId(Long.parseLong(ids[0]));
		compositeProposalCommentId.setId(Long.parseLong(ids[1]));
		return compositeProposalCommentId;
	}
}
